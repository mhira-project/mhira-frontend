import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  TableColumn,
  SortField,
  Action,
  ActionArgs,
  PageSizeOptions,
  PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
} from '../@types/list';
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

  public pageSize: PageSizeOptions = DEFAULT_PAGE_SIZE;

  public PAGE_SIZES = PAGE_SIZES;

  public onSelectAction(action: Action): void {
    this.executeAction.emit({ action, context: this.context });
  }

  public onPageChange(direction?: 'prev' | 'next'): void {
    const paging: Paging = {};

    switch (direction) {
      case 'next':
        paging.after = this.pageInfo?.endCursor;
        paging.first = this.pageSize;
        break;

      case 'prev':
        paging.before = this.pageInfo?.startCursor;
        paging.last = this.pageSize;
        break;

      default:
        paging.first = this.pageSize;
    }

    this.pageChange.emit(paging);
  }

  public onReset(): void {
    if(localStorage.getItem('filter')){
      localStorage.removeItem('filter')
    }
    if(localStorage.getItem('filter-patient-assessment')){
      localStorage.removeItem('filter-patient-assessment')
    }
    location.reload();
  }
}
