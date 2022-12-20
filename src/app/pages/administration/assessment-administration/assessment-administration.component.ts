import { Component, OnInit } from '@angular/core';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { AssessmentAdministrationColumns } from '@app/pages/administration/@tables/assessment-administration.table';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { AssessmentAdministrationForm } from '@app/pages/administration/@forms/assessment-administration.form';
import { finalize } from 'rxjs/operators';
import { AssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';
import { AssessmentAdministrationService } from '@app/pages/administration/@services/assessment-administration.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { Convert } from '../../../@shared/classes/convert';

enum ActionKey {
  EDIT,
}

@Component({
  selector: 'app-assessment-administration',
  templateUrl: './assessment-administration.component.html',
  styleUrls: ['./assessment-administration.component.scss'],
})
export class AssessmentAdministrationComponent implements OnInit {

  public data: Partial<AssessmentAdministration>[];
  public columns: TableColumn<Partial<AssessmentAdministration>>[] = AssessmentAdministrationColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] = [];

  // form properties
  public showCreateAssessmentAdministration = false;
  public populateForm = false;
  public resetForm = false;
  public assessmentAdministration: AssessmentAdministration;
  public assessmentAdministrationForm = AssessmentAdministrationForm;

  public assessmentAdministrationRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(
    private assessmentAdministrationService: AssessmentAdministrationService,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getAssessmentTypes();
    this.actions = [{ key: ActionKey.EDIT, title: 'Edit Type' }];
  }

  public onPageChange(paging: Paging): void {
    this.assessmentAdministrationRequestOptions.paging = paging;
    this.getAssessmentTypes();
  }

  public onSort(sorting: SortField<AssessmentAdministration>[]): void {
    this.assessmentAdministrationRequestOptions.sorting = sorting;
    this.getAssessmentTypes();
  }

  public onFilter(filter: Filter): void {
    this.assessmentAdministrationRequestOptions.filter = filter;
    this.getAssessmentTypes();
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

  public closeCreatePanel(): void {
    this.assessmentAdministration = null;
    this.showCreateAssessmentAdministration = false;
    this.populateForm = false;
    this.resetForm = false;
  }

  public onSubmitForm(assessmentAdministration: AssessmentAdministration): void {
    if (this.assessmentAdministration?.id) {
      assessmentAdministration.id = this.assessmentAdministration.id;
      this.updateAssessmentType(assessmentAdministration);
    } else {
      this.createAssessmentType(assessmentAdministration);
    }
    console.log(assessmentAdministration);
  }

  private getAssessmentTypes(): void {
    this.isLoading = true;
    this.assessmentAdministrationService
      .assessmentAdministration(this.assessmentAdministrationRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.assessmentTypes.edges.map((assessmentTypes: any) =>
            Convert.toAssessmentAdministration(assessmentTypes.node)
          );
          this.pageInfo = data.assessmentTypes.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load assessment type' })
      );
  }

  private updateAssessmentType(assessmentAdministration: AssessmentAdministration) {
    this.assessmentAdministrationService
      .updateAssessmentAdministration(assessmentAdministration)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.isLoading = false;
          this.getAssessmentTypes();
          this.closeCreatePanel();
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to create assessment type' })
      );
  }

  private createAssessmentType(assessmentAdministration: AssessmentAdministration) {
    this.assessmentAdministrationService
      .createAssessmentType(assessmentAdministration)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.isLoading = false;
          this.getAssessmentTypes();
          this.closeCreatePanel();
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to create assessment type' })
      );
  }
}
