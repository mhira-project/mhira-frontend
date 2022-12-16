import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionArgs, SortField, TableColumn } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { Convert } from '@app/@shared/classes/convert';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Action } from 'rxjs/internal/scheduler/Action';
import { finalize } from 'rxjs/operators';
import { AssessmentAdministrationForm } from '../@forms/assessment-administration.form';
import { AssessmentAdministrationService } from '../@services/assessment-administration.service';
import { EmailTemplatesService } from '../@services/email-templates.service';
import { EmailTemplatesColumns } from '../@tables/email-templates.table';
import { AssessmentAdministration } from '../@types/assessment-administration';

enum ActionKey {
  EDIT,
  DELETE
}

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {

  public data: Partial<AssessmentAdministration>[] | any;
  public columns: TableColumn<Partial<AssessmentAdministration>>[] = EmailTemplatesColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] | any = [];

  // form properties
  public showCreateAssessmentAdministration = false;
  public populateForm = false;
  public resetForm = false;
  public assessmentAdministration: AssessmentAdministration;
  public assessmentAdministrationForm = AssessmentAdministrationForm;
  assessmentAdministrationRequestOptions: any;

  constructor(private assessmentAdministrationService: AssessmentAdministrationService, private emailTemplatesService: EmailTemplatesService,
    private errorService: ErrorHandlerService, private nzMessage: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.getEmailTemplates();
    this.actions = [{ key: ActionKey.EDIT, title: 'Edit Template' }, {key: ActionKey.DELETE, title: 'Delete Template'}];
  }

  public onPageChange(paging: Paging): void {
    // this.assessmentAdministrationRequestOptions.paging = paging;
    // this.getAssessmentTypes();
    console.log('Page change!')
  }
  
  getAssessmentTypes() {
    this.isLoading = true;
    this.assessmentAdministrationService
      .assessmentAdministration(this.assessmentAdministrationRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.assessmentTypes.edges.map((assessmentTypes: any) =>
            Convert.toAssessmentAdministration(assessmentTypes.node)
          );
          console.log('this.data', data);
          this.pageInfo = data.assessmentTypes.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load assessment type' })
      );
  }

  getEmailTemplates(){
    this.emailTemplatesService.getAllEmailTemplates()
    .pipe(finalize(() => (this.isLoading = false)))
    .subscribe((x: any) => { this.data = x.data.getAllEmailTemplates.edges.map((x: any) => x.node)
      this.pageInfo = x.data.getAllEmailTemplates.pageInfo;
      console.log('Dataaa: ', x),
      (err: any) => this.errorService.handleError(err, { prefix: 'Unable to load email templates' })});
  }
  
  // createEmailTemplate() {
  //   this.emailTemplatesService
  //     .createEmailTemplate({name: 'Test VS Code', subject: 'test', status: true, body: 'test', module: 'CLIENT'})
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       ({ data }) => {
  //         console.log('Test Data: ', data);
  //         this.isLoading = false;
  //         this.getAssessmentTypes();
  //         // this.closeCreatePanel();
  //       },
  //       (error) => this.errorService.handleError(error, { prefix: 'Unable to create assessment type' })
  //     );
  // }

  deleteEmailTemplate(id: number){
    this.emailTemplatesService.deleteEmailTemplate(id).subscribe(() => {
      this.nzMessage.success('Email template deleted successfully!', { nzDuration: 3000 });
      this.getEmailTemplates();
    });
  }

  public onSort(sorting: SortField<AssessmentAdministration>[]): void {
    // this.assessmentAdministrationRequestOptions.sorting = sorting;
    // this.getAssessmentTypes();
    console.log('Sort!');
  }

  public onFilter(filter: Filter): void {
    // this.assessmentAdministrationRequestOptions.filter = filter;
    // this.getAssessmentTypes();
    console.log('Filter!')
  }

  public onAction({
    action,
    context: assessmentAdministration,
  }: ActionArgs<AssessmentAdministration, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT:
        // this.openCreatePanel(assessmentAdministration);
        this.router.navigate([`/mhira/administration/create-template/${assessmentAdministration.id}`])
        return;
      case ActionKey.DELETE:
        this.deleteEmailTemplate(assessmentAdministration.id);
    }
  }

  public openCreatePanel(assessmentAdministration?: any): void {
    // if (assessmentAdministration) this.assessmentAdministration = assessmentAdministration;
    // this.showCreateAssessmentAdministration = true;
    // this.populateForm = true;
    // this.resetForm = true;
    console.log(assessmentAdministration.name)
  }

}
