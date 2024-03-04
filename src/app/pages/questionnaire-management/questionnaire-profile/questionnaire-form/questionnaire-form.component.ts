import { finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../../@services/questionnaire-management.service';
import { CreateQuestionnaireInput } from '../../@types/questionnaire';
import { QuestionnaireForm, QuestionnaireUpdateForm } from '../../@forms/questionnaire.form';
import { QuestionnaireVersion } from '../../@types/questionnaire';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { PermissionKey } from '@shared/@types/permission';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public PK = PermissionKey;
  public form = QuestionnaireForm;
  public formData: Partial<Omit<CreateQuestionnaireInput & QuestionnaireVersion, 'keywords'> & { keywords: string }>;
  public populateForm = false;
  public resetForm = false;
  public loading = false;
  public inputMode = true;
  public existingId: string;
  listOfOption: any = [];
  listOfTagOptions: any = [];
  customDescription = '';
  editorConfig: AngularEditorConfig = {
    minHeight: '100px',
    editable: true,
    sanitize: false
  }

  public get isExisting(): boolean {
    return !!this.existingId;
  }

  constructor(
    private qmService: QuestionnaireManagementService,
    private messageService: NzMessageService,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    public perms: AppPermissionsService,
    private router: Router
  ) {
    this.resetForm = true;
    this.initQuestionnaire();
  }

  public onSubmit(form: { [K in keyof CreateQuestionnaireInput]: any }): void {
    const input: CreateQuestionnaireInput = { ...form };

    if (!this.isExisting) {
      input.excelFile = (form.excelFile as FileList).item(0);
    }

    // input.keywords = this.prepareKeywords(form.keywords);

    input.keywords = this.listOfTagOptions;
    input.description = this.customDescription;

    const action = this.isExisting
      ? this.qmService.updateQuestionnaire(this.existingId, input)
      : this.qmService.createQuestionnaire(input);

    this.loading = true;
    action.pipe(finalize(() => (this.loading = false))).subscribe(
      (questionnaire) => {
        this.setExistingMode(questionnaire);
        this.messageService.success(
          this.isExisting ? 'Questionnaire updated successfully' : 'Questionnaire created successfully',
          { nzDuration: 3000 }
        );
        this.router.navigate(['/mhira/questionnaire-management/questionnaire-list']);
      },
      (error) =>
        this.errorService.handleError(error, {
          prefix: this.isExisting ? 'Unable to update questionnaire' : 'Unable to create questionnaire',
        })
    );
  }

  public async initQuestionnaire(): Promise<void> {
    const data = this.activatedRoute.snapshot.queryParamMap.get('questionnaire');
    if (!data) return;

    const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
    const questionnaire: QuestionnaireVersion = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    this.setExistingMode(questionnaire);
  }

  private setExistingMode(questionnaire: QuestionnaireVersion): void {
    this.form = QuestionnaireUpdateForm;
    this.existingId = questionnaire._id;
    this.formData = {
      ...questionnaire,
      keywords: (questionnaire.keywords ?? []).join(' '),
      // Fix for dissapearing language in detailed view: ?
      // language: questionnaire.questionnaire?.language,
    };
    this.listOfTagOptions = questionnaire.keywords;
    this.customDescription = questionnaire.description;
    this.populateForm = true;
    this.inputMode = false;
  }

  // private prepareKeywords(keywords: string = ''): string[] {
  //   if (!keywords || keywords === '') return [];
  //   return keywords
  //     .trim()
  //     .split(' ')
  //     .map((word) => word.trim())
  //     .filter((word) => word !== '');
  // }
}
