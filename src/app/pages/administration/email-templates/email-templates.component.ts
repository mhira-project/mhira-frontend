import { Component, OnInit } from '@angular/core';
import { ActionArgs, SortField, TableColumn } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { Convert } from '@app/@shared/classes/convert';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { finalize } from 'rxjs/operators';
import { AssessmentAdministrationForm } from '../@forms/assessment-administration.form';
import { AssessmentAdministrationService } from '../@services/assessment-administration.service';
import { EmailTemplatesColumns } from '../@tables/email-templates.table';
import { AssessmentAdministration } from '../@types/assessment-administration';

enum ActionKey {
  EDIT,
}

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {

  public data: Partial<AssessmentAdministration>[];
  public columns: TableColumn<Partial<AssessmentAdministration>>[] = EmailTemplatesColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] = [];

  // form properties
  public showCreateAssessmentAdministration = false;
  public populateForm = false;
  public resetForm = false;
  public assessmentAdministration: AssessmentAdministration;
  public assessmentAdministrationForm = AssessmentAdministrationForm;
  assessmentAdministrationRequestOptions: any;

  constructor(private assessmentAdministrationService: AssessmentAdministrationService,
    private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAssessmentTypes();
    // this.actions = [{ key: ActionKey.EDIT, title: 'Edit Type' }];
  }

  public onPageChange(paging: Paging): void {
    // this.assessmentAdministrationRequestOptions.paging = paging;
    // this.getAssessmentTypes();
    console.log('Page change!')
  }
  getAssessmentTypes() {
    // throw new Error('Method not implemented.');
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

  public onSort(sorting: SortField<AssessmentAdministration>[]): void {
    // this.assessmentAdministrationRequestOptions.sorting = sorting;
    // this.getAssessmentTypes();
    console.log('Sort!')
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
        this.openCreatePanel(assessmentAdministration);
        return;
    }
  }
  public openCreatePanel(assessmentAdministration?: AssessmentAdministration): void {
    if (assessmentAdministration) this.assessmentAdministration = assessmentAdministration;
    this.showCreateAssessmentAdministration = true;
    this.populateForm = true;
    this.resetForm = true;
  }

}
