import { Filter } from '@shared/@types/filter';
import { Convert } from '@shared/classes/convert';
import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { FormattedQuestionnaireVersion, QuestionnaireStatus } from '../@types/questionnaire';
import {
  TableColumn,
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
} from '@shared/@modules/master-data/@types/list';
import { PermissionKey } from '@shared/@types/permission';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { QuestionnaireColumns } from '../@tables/questionnaire.table';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { TranslateService } from '@ngx-translate/core';

const CryptoJS = require('crypto-js');

enum ActionKey {
  ARCHIVE_QUESTIONNAIRE,
  // DELETE_QUESTIONNAIRE,
}

// TODO: implement keyword search
// https://github.com/doug-martin/nestjs-query/issues/1015
export const createSearchFilter = (searchString: string): Array<{ [K in keyof Partial<QuestionnaireVersion>]: {} }> => {
  if (!searchString) return [];
  return [
    { name: { iLike: `%${searchString}%` } },
    // {
    //   questionnaire: {
    //     or: [{ abbreviation: { iLike: `%${searchString}%` } }, { language: { iLike: `%${searchString}%` } }],
    //   },
    // },
  ];
};

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class QuestionnaireListComponent {
  public PK = PermissionKey;

  public data: FormattedQuestionnaireVersion[];

  public columns: TableColumn<FormattedQuestionnaireVersion>[] = QuestionnaireColumns;

  public actions: Action<ActionKey>[] = [];

  public loading = false;

  public pageInfo: PageInfo;

  public questionnaireRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {and: [{status: {neq: 'PRIVATE'}}, {zombie: {is: false}}]},
    sorting: [],
  };

  constructor(
    private qmService: QuestionnaireManagementService,
    public perms: AppPermissionsService,
    private router: Router,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService,
    private translate: TranslateService
  ) {
    this.getQuestionnaires();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_QUESTIONNAIRES)) {
      this.actions.push({ key: ActionKey.ARCHIVE_QUESTIONNAIRE, title: 'Discard Questionnaire' });
    }
    // if (this.perms.permissionsOnly(PermissionKey.DELETE_QUESTIONNAIRES)) {
    //   this.actions.push({ key: ActionKey.DELETE_QUESTIONNAIRE, title: 'Delete Questionnaire' });
    // }
  }

  public onSelect(questionnaire: FormattedQuestionnaireVersion): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(questionnaire), environment.secretKey).toString();
    this.router.navigate(['/mhira/questionnaire-management/questionnaire-form'], {
      queryParams: {
        questionnaire: dataString,
      },
    });
  }

  public onAction({ action, context: questionnaire }: ActionArgs<FormattedQuestionnaireVersion, ActionKey>): void {
    switch (action.key) {
      case ActionKey.ARCHIVE_QUESTIONNAIRE:
        this.deleteQuestionnaire(questionnaire);
        return;
      // case ActionKey.DELETE_QUESTIONNAIRE:
      //   this.deleteQuestionnaire(questionnaire, false);
      //   return;
    }
  }

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
    this.questionnaireRequestOptions.filter = { or: createSearchFilter(searchString) };
    this.getQuestionnaires();
  }

  private getQuestionnaires(): void {
    this.loading = true;
    this.qmService
      .getQuestionnaires(this.questionnaireRequestOptions)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ edges, pageInfo }) => {
        this.pageInfo = pageInfo;
        this.data = edges.map((e) => Convert.toFormattedQuestionnaireVersion(e.node));
      });
  }

  private async deleteQuestionnaire(
    questionnaire: FormattedQuestionnaireVersion,
    archive: boolean = true
  ): Promise<void> {
    if (!archive) {
      // create confirmation modal
      const modal = this.modalService.confirm({
        nzOnOk: () => true,
        nzTitle: 'Delete Questionnaire',
        nzContent: `This action will delete the questionnaire and all the associated assessments. Are you sure you want to proceed?`,
      });

      // wait for modal to successfully complete
      const confirmation = await modal.afterClose.toPromise();
      if (!confirmation) return;
    }

    if (archive) {
      // create confirmation modal
      let title = '';
      let content = '';
      let continueButton = '';
      let cancelButton = '';

      this.translate.get('questionnaires.discardedTitle').subscribe((translation) => title = translation);
      this.translate.get('questionnaires.discardedMessage').subscribe((translation) => content = translation);
      this.translate.get('questionnaires.continueButton').subscribe((translation) => continueButton = translation);
      this.translate.get('questionnaires.cancelButton').subscribe((translation) => cancelButton = translation);

      const modal = this.modalService.confirm({
        nzOnOk: () => true,
        nzTitle: title,
        nzContent: content,
        nzClosable: false,
        nzOkText: continueButton,
        nzCancelText: cancelButton
      });

      // wait for modal to successfully complete
      const confirmation = await modal.afterClose.toPromise();
      if (!confirmation) return;
    }

    this.loading = true;
    this.qmService
      .deleteQuestionnaire(questionnaire._id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          if (archive) {
            questionnaire.status = QuestionnaireStatus.ARCHIVED;
            questionnaire = Convert.toFormattedQuestionnaireVersion(questionnaire);
          } else {
            this.data.splice(this.data.indexOf(questionnaire), 1);
          }
          this.getQuestionnaires();
        },
        (error) =>
          this.errorService.handleError(error, { prefix: `Unable to delete assessment "${questionnaire.name}"` })
      );
  }
}
