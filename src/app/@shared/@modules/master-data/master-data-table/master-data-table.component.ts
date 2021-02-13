import { Component, Input, EventEmitter, Output } from '@angular/core';
export interface TableColumn<T> {
  name: keyof T;
  title: string;
  render?: 'html' | 'date' | 'tag' | 'avatar' | undefined;
}

export interface Paging {
  pageSize: number;
  pageIndex: number;
  total?: number;
}

export interface PageChangeEvent {
  previousIndex: number;
  nextIndex: number;
}

export interface TagInfo {
  color: string;
  title: string;
}

@Component({
  selector: 'app-master-data-table',
  templateUrl: './master-data-table.component.html',
  styleUrls: ['./master-data-table.component.scss'],
})
export class MasterDataTableComponent<T> {
  @Input()
  public columns: TableColumn<T>[] = [];

  @Input()
  public data: T[] = [];

  @Input()
  public paging: Paging = {} as Paging;

  @Output()
  public pageChange = new EventEmitter<PageChangeEvent>();

  public onPageIndexChange(nextIndex: number) {
    const pageChangeEvt: PageChangeEvent = { previousIndex: this.paging.pageIndex, nextIndex };
    this.paging.pageIndex = nextIndex;
    this.pageChange.emit(pageChangeEvt);
  }
}
