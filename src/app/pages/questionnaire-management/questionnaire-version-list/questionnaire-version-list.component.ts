import { Component, OnInit } from '@angular/core';
import {
  FormattedQuestionnaireVersion,
  QuestionnaireVersion,
} from '@app/pages/questionnaire-management/@types/questionnaire';
import { DEFAULT_PAGE_SIZE, SortField, TableColumn } from '@shared/@modules/master-data/@types/list';
import { QuestionnaireVersionsColumns } from '@app/pages/questionnaire-management/@tables/questionnaire-version.table';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { createSearchFilter } from '@app/pages/questionnaire-management/questionnaire-list/questionnaire-list.component';
import { Sorting } from '@shared/@types/sorting';
import { finalize } from 'rxjs/operators';
import { Convert } from '@shared/classes/convert';
import { QuestionnaireManagementService } from '@app/pages/questionnaire-management/@services/questionnaire-management.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

const CryptoJS = require('crypto-js');

export const createSearchFilter1 = (
  searchString: string
): Array<{ [K in keyof Partial<FormattedQuestionnaireVersion>]: {} }> => {
  if (!searchString) return [];
  return [
    { name: { iLike: `%${searchString}%` } },
    { abbreviation: { iLike: `%${searchString}%` } },
    { language: { iLike: `%${searchString}%` } },
  ];
};

@Component({
  selector: 'app-questionnaire-version-list',
  templateUrl: './questionnaire-version-list.component.html',
  styleUrls: ['./questionnaire-version-list.component.scss'],
})
export class QuestionnaireVersionListComponent implements OnInit {
  public data: FormattedQuestionnaireVersion[];
  public loading = false;
  public pageInfo: PageInfo;

  public columns: TableColumn<FormattedQuestionnaireVersion>[] = QuestionnaireVersionsColumns;

  public questionnaireRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {and: [{zombie: {is: false}}]},
    sorting: [],
  };

  constructor(private qmService: QuestionnaireManagementService, private router: Router) {}

  ngOnInit(): void {}

  public onPageChange(paging: Paging): void {
    this.questionnaireRequestOptions.paging = paging;
    this.getQuestionnaires();
  }

  public onSort(sorting: SortField<FormattedQuestionnaireVersion>[]): void {
    this.questionnaireRequestOptions.sorting = sorting;
    this.getQuestionnaires();
  }

  public onFilter(filter: Filter): void {
    this.questionnaireRequestOptions.filter = filter;
    this.getQuestionnaires();
  }

  public onSearch(searchString: string): void {
    this.questionnaireRequestOptions.filter = { or: createSearchFilter1(searchString) };
    this.getQuestionnaires();
  }

  public onSelect(questionnaire: FormattedQuestionnaireVersion): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(questionnaire), environment.secretKey).toString();
    this.router.navigate(['/mhira/questionnaire-management/questionnaire-form'], {
      queryParams: {
        questionnaire: dataString,
      },
    });
  }

  private getQuestionnaires(): void {
    this.loading = true;
    this.qmService
      .getQuestionnaires(this.questionnaireRequestOptions)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ edges, pageInfo }) => {
        console.log(edges);
        this.pageInfo = pageInfo;
        this.data = edges.map((e) => Convert.toFormattedQuestionnaireVersion2(e.node));
      });
  }
}
