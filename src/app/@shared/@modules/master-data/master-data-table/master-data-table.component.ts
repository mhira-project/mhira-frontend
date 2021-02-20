import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent, NzTableQueryParams } from 'ng-zorro-antd';

export interface TableColumn<T> {
  name: keyof T;
  title: string;
  render?: 'html' | 'date' | 'tag' | 'avatar' | undefined;
  sort?: boolean;
}

export interface TagInfo {
  color: string;
  title: string;
}

export interface SortField<T> {
  field: keyof T;
  direction: 'ASC' | 'DESC';
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
  public loading = false;

  @Input()
  public contextMenu: NzDropdownMenuComponent;

  @Input()
  public context: T;

  @Output()
  public contextChange = new EventEmitter<T>();

  @Output()
  public rowClick = new EventEmitter<T>();

  @Output()
  public sort = new EventEmitter<SortField<T>[]>();

  constructor(private contextMenuService: NzContextMenuService) {}

  public onOpenContextMenu(event: MouseEvent, context: T): void {
    this.context = context;
    this.contextChange.emit(context);
    this.contextMenuService.create(event, this.contextMenu);
  }

  public onSort({ sort }: NzTableQueryParams) {
    const values = { ascend: 'ASC', descend: 'DESC' };
    const sortFields: SortField<T>[] = sort
      .filter((field) => !!field.value)
      .map((field) => ({ field: field.key, direction: values[field.value] } as SortField<T>));
    this.sort.emit(sortFields);
  }
}
