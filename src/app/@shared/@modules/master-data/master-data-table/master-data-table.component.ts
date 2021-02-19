import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd';

export interface TableColumn<T> {
  name: keyof T;
  title: string;
  render?: 'html' | 'date' | 'tag' | 'avatar' | undefined;
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
  public loading = false;

  @Input()
  public contextMenu: NzDropdownMenuComponent;

  @Input()
  public context: T;

  @Output()
  public contextChange = new EventEmitter<T>();

  @Output()
  public rowClick = new EventEmitter<T>();

  constructor(private contextMenuService: NzContextMenuService) {}

  public onOpenContextMenu(event: MouseEvent, context: T): void {
    this.context = context;
    this.contextChange.emit(context);
    this.contextMenuService.create(event, this.contextMenu);
  }
}
