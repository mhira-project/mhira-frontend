import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ExportChoiceType } from './export-choice.type';
import { XlsExportService } from '@shared/services/xls-export.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() exportWithOption = false;
  @Input() showFilterButton = false;
  @Input() listOfExportOptions: ExportChoiceType[] = [];
  @Input() frontPagination = false;
  @Input() loading = false;
  @Input() hasNextPage = false;
  @Input() hasPreviousPage = false;
  @Input() total = 50;
  @Input() limit = 5;
  @Input() currentPage = 1;
  @Input() showDateFilter = false;
  @Input() showCustomActions = false;
  @Input() showPagination = true;
  @Input() showNext = true;
  @Input() showActionColumn = true;
  @Input() showCheckBoxColumn = true;
  @Input() showSearch = true;
  @Input() showExport = false;
  @Input() showImport = false;
  @Input() listOfColumn: any[] = [];
  @Input() showEdit = false;
  @Input() showDelete = false;
  @Input() showView = false;
  @Input() showButton = false;
  @Input() buttonText = 'Add';
  @Input() buttonIcon = 'plus';
  @Input() listOfCustomActions: any[] = [];
  @Input() exportData: any[] = [];
  @Input() listOfData: any[] = [];

  /* tslint:disable:no-output-on-prefix */
  /* TODO: fix lint */
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilterButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onImport: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCustomAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrevious: EventEmitter<any> = new EventEmitter<any>();
  @Output() onParamChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDateFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  /* tslint:enable:no-output-on-prefix */

  checked = false;
  dateRange: any[] = [];
  indeterminate = false;
  searchValue: any = '';
  listOfDisplayData: any[] = [];
  listOfCurrentPageData: any[] = [];
  setOfCheckedId = new Set<number>();

  constructor(private xlsExportService: XlsExportService) {}

  ngOnInit(): void {
    this.onFilterSearch(null);
  }

  ngOnChanges() {
    this.onFilterSearch(null);
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  reset(): void {
    this.searchValue = '';
    this.onFilterSearch(null);
  }

  onFilterSearch(column: any): void {
    if (this.exportData.length > 0) {
      this.frontPagination = true;
      this.listOfDisplayData = this.exportData;
    } else {
      if (column) {
        this.listOfDisplayData = this.listOfData.filter(
          (item: string) => item[column]?.indexOf(this.searchValue) !== -1
        );
      } else {
        this.listOfDisplayData = this.listOfData;
      }
    }
  }

  onExportAction() {
    this.xlsExportService.exportExcel(this.listOfDisplayData, 'exportedData');
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.onParamChange.emit(params);
  }

  onViewAction(data: any, index: number = -1) {
    this.onView.emit({ data, index });
  }

  onEditAction(data: any, index: number = -1) {
    this.onEdit.emit({ data, index });
  }

  onDeleteAction(data: any, index: number = -1) {
    this.onDelete.emit({ data, index });
  }

  onImportAction() {
    this.onImport.emit();
  }

  onNewAction() {
    this.onButton.emit();
  }

  onFilterButtonAction() {
    this.onFilterButton.emit();
  }

  onSearchAction(data: any) {
    this.onSearch.emit((data.target as HTMLInputElement).value);
  }

  handleEmptySearch() {
    this.onSearch.emit('');
  }

  onCustomActionEvent(event: any, data: any) {
    event.data = data;
    this.onCustomAction.emit(event);
  }

  emitAction(action: any, index: number) {
    this.onAction.emit({ action, index });
  }

  onDateFilterChange($event: any) {
    this.onDateFilter.emit($event);
  }

  onPreviousAction() {
    this.onPrevious.emit();
  }

  onNextAction() {
    this.onNext.emit();
  }

  handleRowClick(row: any, index: number) {
    this.rowClick.emit({ row, index });
  }
}
