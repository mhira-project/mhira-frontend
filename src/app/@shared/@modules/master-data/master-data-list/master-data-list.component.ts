import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn, Paging, PageChangeEvent } from '../master-data-table/master-data-table.component';

export interface Action {
  key: string;
  title: string;
}

export interface ActionArgs<T> {
  action: Action;
  context: T;
}

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
  public paging: Paging = {} as Paging;

  @Input()
  public loading = false;

  @Input()
  public actions: Action[];

  @Output()
  public pageChange = new EventEmitter<PageChangeEvent>();

  @Output()
  public rowClick = new EventEmitter<T>();

  @Output()
  public executeAction = new EventEmitter<ActionArgs<any>>();

  public context: T;

  public onSelectAction(action: Action): void {
    this.executeAction.emit({ action, context: this.context });
  }
}
