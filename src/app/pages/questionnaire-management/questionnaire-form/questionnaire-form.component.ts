import { finalize } from 'rxjs/operators';
import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { CreateQuestionnaireInput } from '../@types/questionnaire';
import { QuestionnaireForm } from '../@forms/questionnaire.form';
import { QuestionnaireVersion } from './../@types/questionnaire';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public form = QuestionnaireForm;
  public formData: QuestionnaireVersion;
  public populateForm = false;
  public resetForm = false;
  public loading = false;

  constructor(private qmService: QuestionnaireManagementService, private messageService: NzMessageService) {}

  public onSubmit(form: { [K in keyof CreateQuestionnaireInput]: any }): void {
    const input: CreateQuestionnaireInput = {
      ...form,
      excelFile: (form.excelFile as FileList).item(0),
    };

    this.loading = true;
    this.qmService
      .uploadQuestionnaire(input)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.resetForm = true;
          this.messageService.success('Questionnaire created successfully', { nzDuration: 3000 });
        },
        () => this.messageService.error('Questionnaire creation failed', { nzDuration: 3000 })
      );
  }
}
