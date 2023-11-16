import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionArgs, DEFAULT_PAGE_SIZE, SortField, TableColumn } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { QuestionnaireBundlesColumns } from '@app/pages/administration/@tables/questionnaire-bundles.table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { QuestionnaireBundlesService } from '../@services/questionnaire-bundles.service';
import { Sorting } from '@app/@shared/@types/sorting';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

enum ActionKey {
  EDIT,
  DELETE,
}

@Component({
  selector: 'app-questionnaire-bundles-list',
  templateUrl: './questionnaire-bundles-list.component.html',
  styleUrls: ['./questionnaire-bundles-list.component.scss'],
})
export class QuestionnaireBundlesListComponent implements OnInit {
  public data: Partial<any>[] | any;
  public columns: TableColumn<Partial<any>>[] = QuestionnaireBundlesColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] | any = [];

  public bundlesRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[]; departmentIds: [] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
    departmentIds: undefined,
  };

  constructor(
    private router: Router,
    private bundlesService: QuestionnaireBundlesService,
    private translate: TranslateService,
    private nzMessage: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getQuestionnaireBundles();
    this.actions = [
      { key: ActionKey.EDIT, title: 'Edit Bundle' },
      { key: ActionKey.DELETE, title: 'Delete Bundle' },
    ];
  }

  private getQuestionnaireBundles(): void {
    this.isLoading = true;
    this.bundlesService
      .getQuestionnairesBundles(this.bundlesRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      // tslint:disable
      .subscribe((x: any) => {
        this.data = x.data?.getQuestionnaireBundles?.edges.map((q: any) => q.node);
        this.pageInfo = x.data?.getQuestionnaireBundles?.pageInfo;
      });
  }

  deleteQuestionnaireBundle(id: string) {
    this.bundlesService.deleteQuestionnaireBundle(id).subscribe(() => {
      const message$ = this.translate.get('bundles.deleted').subscribe((message) => {
        this.nzMessage.success(message, { nzDuration: 3000 });
      });
      message$.unsubscribe();
      this.getQuestionnaireBundles();
    });
  }

  public onPageChange(paging: Paging): void {
    console.log('Page Change!');
  }

  public onSort(sorting: SortField<any>[]): void {
    console.log('Sort Change!');
  }

  public onFilter(filter: Filter): void {
    console.log('Filter Change!');
  }

  public onAction({ action, context: assessmentAdministration }: ActionArgs<any, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT:
        this.router.navigate([
          `/mhira/questionnaire-management/create-questionnaire-bundle/${assessmentAdministration._id}`,
        ]);
        return;

      case ActionKey.DELETE:
        this.deleteQuestionnaireBundle(assessmentAdministration._id);
        return;
    }
  }
}
