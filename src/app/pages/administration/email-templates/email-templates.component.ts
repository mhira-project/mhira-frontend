import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionArgs, SortField, TableColumn } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Action } from 'rxjs/internal/scheduler/Action';
import { finalize } from 'rxjs/operators';
import { EmailTemplatesService } from '../@services/email-templates.service';
import { EmailTemplatesColumns } from '../@tables/email-templates.table';

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

  public data: Partial<any>[] | any;
  public columns: TableColumn<Partial<any>>[] = EmailTemplatesColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] | any = [];

  // form properties
  public showCreateAssessmentAdministration = false;
  public populateForm = false;
  public resetForm = false;

  constructor(private emailTemplatesService: EmailTemplatesService,
    private errorService: ErrorHandlerService, private nzMessage: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.getEmailTemplates();
    this.actions = [{ key: ActionKey.EDIT, title: 'Edit Template' }, {key: ActionKey.DELETE, title: 'Delete Template'}];
  }

  public onPageChange(paging: Paging): void {
    console.log('Page change!')
  }

  getEmailTemplates(){
    this.emailTemplatesService.getAllEmailTemplates()
    .pipe(finalize(() => (this.isLoading = false)))
    .subscribe((x: any) => { this.data = x.data.getAllEmailTemplates.edges.map((x: any) => x.node)
      this.pageInfo = x.data.getAllEmailTemplates.pageInfo;
      console.log('Dataaa: ', x),
      (err: any) => this.errorService.handleError(err, { prefix: 'Unable to load email templates' })});
  }

  deleteEmailTemplate(id: number){
    this.emailTemplatesService.deleteEmailTemplate(id).subscribe(() => {
      this.nzMessage.success('Email template deleted successfully!', { nzDuration: 3000 });
      this.getEmailTemplates();
    });
  }

  public onSort(sorting: SortField<any>[]): void {
    console.log('Sort!');
  }

  public onFilter(filter: Filter): void {
    console.log('Filter!')
  }

  public onAction({
    action,
    context: assessmentAdministration,
  }: ActionArgs<any, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT:
        this.router.navigate([`/mhira/administration/create-template/${assessmentAdministration.id}`])
        return;
      case ActionKey.DELETE:
        this.deleteEmailTemplate(assessmentAdministration.id);
    }
  }
}
