import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireVersion } from '../@types/questionnaire';
import { switchMap } from 'rxjs/operators';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { QuestionnaireBundlesService } from '../@services/questionnaire-bundles.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentsService } from '@app/pages/patients-management/@services/departments.service';
import { Convert } from '@app/@shared/classes/convert';
import { Filter } from '@app/@shared/@types/filter';
import { Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';

@Component({
  selector: 'app-create-questionnaire-bundle',
  templateUrl: './create-questionnaire-bundle.component.html',
  styleUrls: ['./create-questionnaire-bundle.component.scss'],
})
export class CreateQuestionnaireBundleComponent implements OnInit {
  selectedQuestionnaires: QuestionnaireVersion[] = [];
  public departmentsRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: 50 },
    filter: {},
    sorting: [],
  };
  isUpdateMode = false;
  selectedDepartments: [] = [];
  selectedId: string;
  bundle: any;
  bundleForm = this.fb.group({
    name: ['', Validators.required],
    questionnaireIds: [],
    departmentIds: [],
  });
  listOfDepartments: [] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bundlesService: QuestionnaireBundlesService,
    private router: Router,
    private nzMessage: NzMessageService,
    private translate: TranslateService,
    private departmentsService: DepartmentsService,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.route.params.subscribe((data) => {
      if (data._id) {
        this.isUpdateMode = true;
        this.route.paramMap
          .pipe(
            switchMap((params) => {
              this.selectedId = params.get('_id');
              this.bundleForm.addControl('_id', this.fb.control(this.selectedId));
              return this.bundlesService.getOneQuestionnaireBundle(this.selectedId);
            })
            // tslint:disable
          )
          .subscribe((data: any) => {
            this.bundle = data.data.getQuestionnaireBundle;
            this.bundleForm.controls['name'].setValue(this.bundle?.name);
            this.selectedQuestionnaires = this.bundle?.questionnaires;
            this.bundleForm.patchValue({ questionnaireIds: this.bundle?.questionnaires.map((q: any) => q._id) });
          });
      }
    });
  }

  onFormSubmit() {
    this.bundleForm.controls['departmentIds'].setValue(this.selectedDepartments);
    this.bundlesService.createQuestionnaireBundle(this.bundleForm.value).subscribe(
      () => {
        this.bundleForm.reset();
        const message$ = this.translate.get('bundles.created').subscribe((message) => {
          this.nzMessage.success(message, { nzDuration: 3000 });
        });
        message$.unsubscribe();
        this.router.navigate(['/mhira/questionnaire-management/questionnaire-bundles-list']);
      },
      (err) => {
        this.nzMessage.error(`${err}`, { nzDuration: 3000 });
      }
    );
  }

  onFormUpdateSubmit() {
    this.bundleForm.controls['departmentIds'].setValue(this.selectedDepartments);
    this.bundlesService.updateQuestionnaireBundle(this.bundleForm.value).subscribe(
      () => {
        this.bundleForm.reset();
        const message$ = this.translate.get('bundles.updated').subscribe((message) => {
          this.nzMessage.success(message, { nzDuration: 3000 });
        });
        message$.unsubscribe();
        this.router.navigate(['/mhira/questionnaire-management/questionnaire-bundles-list']);
      },
      (err) => {
        this.nzMessage.error(`${err}`, { nzDuration: 3000 });
      }
    );
  }

  public onQuestionnaireSelected(questionnaires: QuestionnaireVersion[]): void {
    this.selectedQuestionnaires = questionnaires;
    this.bundleForm.patchValue({ questionnaireIds: questionnaires.map((q) => q._id) });
  }

  getDepartments(): void {
    this.departmentsService
      .departments(this.departmentsRequestOptions)
      .pipe()
      .subscribe(
        ({ data }: any) => {
          this.listOfDepartments = data.departments.edges.map((department: any) =>
            Convert.toDepartment(department.node)
          );
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load departments' })
      );
  }

  selectDepartments(event: any) {
    this.selectedDepartments = event;
  }

  bundleHasDepartment(currentDepartmentId: number): boolean {
    if (this.isUpdateMode && this.bundle !== undefined) {
      const department = this.bundle?.departmentIds?.filter(
        (departmentId: any) => departmentId === currentDepartmentId
      );
      return department.length > 0;
    }
    return false;
  }
}
