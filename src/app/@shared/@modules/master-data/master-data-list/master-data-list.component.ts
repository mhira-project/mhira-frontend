import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn, SortField, Action, ActionArgs } from '../@types/list';
import { PageInfo, Paging } from '../../../@types/paging';
import { Filter } from '../../../@types/filter';

@Component({
  selector: 'app-master-data-list',
  templateUrl: './master-data-list.component.html',
  styleUrls: ['./master-data-list.component.scss'],
})
export class MasterDataListComponent<T> {
  @Input()
  public columns: TableColumn<T>[] = [];

  @Input()
  public data: T[] = [];

  @Input()
  public pageInfo: PageInfo;

  @Input()
  public pageSize = 20;

  @Input()
  public loading = false;

  @Input()
  public actions: Action[];

  @Output()
  public pageChange = new EventEmitter<Paging>();

  @Output()
  public rowClick = new EventEmitter<T>();

  @Output()
  public sort = new EventEmitter<SortField<T>[]>();

  @Output()
  public filter = new EventEmitter<Filter>();

  @Output()
  public executeAction = new EventEmitter<ActionArgs<any>>();

  public context: T;

  public onSelectAction(action: Action): void {
    this.executeAction.emit({ action, context: this.context });
  }

  public onPageChange(direction: 'prev' | 'next'): void {
    const paging: Paging =
      direction === 'next'
        ? {
            after: this.pageInfo?.endCursor,
            first: this.pageSize,
          }
        : {
            before: this.pageInfo?.startCursor,
            last: this.pageSize,
          };

    this.pageChange.emit(paging);
  }
}
