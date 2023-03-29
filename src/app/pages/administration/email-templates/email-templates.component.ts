import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionArgs, SortField, TableColumn, DEFAULT_PAGE_SIZE } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';
import { Convert } from '@app/@shared/classes/convert';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Action } from 'rxjs/internal/scheduler/Action';
import { finalize } from 'rxjs/operators';
import { EmailTemplatesService } from '../@services/email-templates.service';
import { EmailTemplatesColumns } from '../@tables/email-templates.table';

enum ActionKey {
  EDIT
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

  public emailTemplatesRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(
    private emailTemplatesService: EmailTemplatesService,
    private errorService: ErrorHandlerService,
    private nzMessage: NzMessageService, 
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getEmailTemplates();
    this.actions = [{ key: ActionKey.EDIT, title: 'Edit Template'}];
  }

  public onPageChange(paging: Paging): void {
    this.emailTemplatesRequestOptions.paging = paging;
    this.getEmailTemplates();
  }

  public onSort(sorting: SortField<any>[]): void {
    this.emailTemplatesRequestOptions.sorting = sorting;
  }

  public onFilter(filter: Filter): void {
    this.emailTemplatesRequestOptions.filter = filter;
    this.getEmailTemplates();
  }

  private getEmailTemplates(): void{
    this.isLoading = true;
    this.emailTemplatesService
    .getAllEmailTemplates(this.emailTemplatesRequestOptions)
    .pipe(finalize(() => (this.isLoading = false)))
    // tslint:disable
    .subscribe((x: any) => { this.data = x.data.getAllEmailTemplates.edges.map((x: any) =>
      Convert.toAssessmentAdministration(x.node));
      this.pageInfo = x.data.getAllEmailTemplates.pageInfo;
      const message$ = this.translate.get('emailTemplates.unableToLoad').subscribe((message) => {
        (err: any) => this.errorService.handleError(err, { prefix: message })
      });
      message$.unsubscribe();
    });
  }

  deleteEmailTemplate(id: number){
    this.emailTemplatesService.deleteEmailTemplate(id).subscribe(() => {
      const message$ = this.translate.get('emailTemplates.deleted').subscribe((message) => {
        this.nzMessage.success(message, { nzDuration: 3000 });
      });
      message$.unsubscribe();
      this.getEmailTemplates();
    });
  }

  public onAction({
    action,
    context: assessmentAdministration,
  }: ActionArgs<any, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT:
        this.router.navigate([`/mhira/administration/create-template/${assessmentAdministration.id}`])
        return;
    }
  }
}
