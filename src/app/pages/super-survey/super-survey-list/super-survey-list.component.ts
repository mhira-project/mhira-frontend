import { Component } from '@angular/core';
import { SuperSurveyService } from '../@services/super-survey.service';
import { TableColumn, SortField, DEFAULT_PAGE_SIZE } from '@shared/@modules/master-data/@types/list';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormattedSuperSurvey } from '@app/pages/super-survey/@types/super-survey';
import { SuperSurveyColumns } from '@app/pages/super-survey/@tables/super-survey.table';

@Component({
  selector: 'app-super-survey-list',
  templateUrl: './super-survey-list.component.html',
})
export class SuperSurveyListComponent {
  public data: FormattedSuperSurvey[];

  public columns: TableColumn<FormattedSuperSurvey>[] = SuperSurveyColumns;

  public loading = false;

  public pageInfo: PageInfo;

  public surveyRequestOptions: { paging: Paging; filter: Filter; sorting: SortField<FormattedSuperSurvey>[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(private surveyService: SuperSurveyService, private router: Router) {
    this.getSuperSurveys();
  }

  public onPageChange(paging: Paging): void {
    this.surveyRequestOptions.paging = paging;
    this.getSuperSurveys();
  }

  public onSort(sorting: SortField<FormattedSuperSurvey>[]): void {
    this.surveyRequestOptions.sorting = sorting;
    this.getSuperSurveys();
  }

  public onFilter(filter: Filter): void {
    this.surveyRequestOptions.filter = filter;
    this.getSuperSurveys();
  }

  public onSearch(searchString: string): void {
    this.surveyRequestOptions.filter = { or: createSearchFilter(searchString) };
    this.getSuperSurveys();
  }

  public onSelect(superSurvey: FormattedSuperSurvey): void {
    this.router.navigateByUrl(`/mhira/super-survey/view/${superSurvey.id}`);
  }

  private getSuperSurveys(): void {
    this.loading = true;
    this.surveyService
      .getSuperSurveys(this.surveyRequestOptions)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ edges, pageInfo }) => {
        this.pageInfo = pageInfo;
        this.data = edges.map((e) => ({
          ...e.node,
        }));
      });
  }
}

// Utility function for search filtering
export const createSearchFilter = (searchString: string): Array<{ [K in keyof Partial<FormattedSuperSurvey>]: {} }> => {
  if (!searchString) return [];
  return [{ fullName: { iLike: `%${searchString}%` } }, { abbreviation: { iLike: `%${searchString}%` } }];
};
