import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionArgs, SortField, TableColumn } from '@app/@shared/@modules/master-data/@types/list';
import { Filter } from '@app/@shared/@types/filter';
import { PageInfo, Paging } from '@app/@shared/@types/paging';
import { QuestionnaireBundlesColumns } from '@app/pages/administration/@tables/questionnaire-bundles.table';
import { Action } from 'rxjs/internal/scheduler/Action';

enum ActionKey {
  EDIT,
  DELETE
}

@Component({
  selector: 'app-questionnaire-bundles-list',
  templateUrl: './questionnaire-bundles-list.component.html',
  styleUrls: ['./questionnaire-bundles-list.component.scss']
})

export class QuestionnaireBundlesListComponent implements OnInit {

  public data: Partial<any>[] | any;
  public columns: TableColumn<Partial<any>>[] = QuestionnaireBundlesColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] | any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onPageChange(paging: Paging): void {
    console.log('Page Change!')
  }

  public onSort(sorting: SortField<any>[]): void {
    console.log('Sort Change!')
  }

  public onFilter(filter: Filter): void {
    console.log('Filter Change!')
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
        console.log('Delete!')
        return;  
    }
  }

}
