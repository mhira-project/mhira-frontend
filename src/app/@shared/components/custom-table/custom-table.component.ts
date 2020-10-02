import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { ExportChoiceType } from './export-choice.type';
import { XlsExportService } from '@shared/services/xls-export.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css'],
})
export class CustomTableComponent implements OnInit, OnChanges {
  checked = false;
  dateRange: any[] = [];

  @Input()
  exportWithOption: boolean = false;

  @Input()
  showFilterButton: boolean = false;

  @Input()
  listOfExportOptions: ExportChoiceType[] = [];

  @Input()
  frontPagination: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  hasNextPage: boolean = true;

  @Input()
  hasPreviousPage: boolean = true;

  @Input()
  total: number = 50;

  @Input()
  limit: number = 5;

  @Input()
  currentPage: number = 1;

  indeterminate = false;

  searchValue: any = '';

  @Input()
  listOfCustomActions: any[] = [];

  @Input()
  exportData: any[] = [];

  @Input()
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];
  listOfCurrentPageData: any[] = [];
  setOfCheckedId = new Set<number>();

  @Input()
  showDateFilter: boolean = false;

  @Input()
  showCustomActions: boolean = false;

  @Input()
  showPagination: boolean = true;

  @Input()
  showNext = true;

  @Input()
  showActionColumn: boolean = true;

  @Input()
  showCheckBoxColumn: boolean = true;

  @Input()
  showSearch: boolean = true;

  @Input()
  showExport: boolean = false;

  @Input()
  showImport: boolean = false;

  @Input()
  listOfColumn: any[] = [];

  @Input()
  showEdit: boolean = false;

  @Input()
  showDelete: boolean = false;

  @Input()
  showView: boolean = false;

  @Input()
  showButton: boolean = false;

  @Input()
  buttonText: string = 'Add';

  @Input()
  buttonIcon: string = 'plus';

  @Output()
  onEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onFilterButton: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onView: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onButton: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onImport: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCustomAction: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onAction: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onNext: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onPrevious: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onParamChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDateFilter: EventEmitter<any> = new EventEmitter<any>();

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

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    this.onParamChange.emit(params);
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

  onSearchAction(data: any) {
    const stringEmitted = (data.target as HTMLInputElement).value;
    this.onSearch.emit(stringEmitted);
  }

  onCustomActionEvent(event: any, data: any) {
    event.data = data;
    this.onCustomAction.emit(event);
  }

  emitAction(action: any, index: number) {
    this.onAction.emit({ action, index });
  }

  reset(): void {
    this.searchValue = '';
    this.onFilterSearch(null);
  }

  onDateFilterChange($event: any) {
    this.onDateFilter.emit($event);
  }

  onExportAction() {
    this.xlsExportService.exportExcel(this.listOfDisplayData, 'exportedData');
  }

  onPreviousAction() {
    this.onPrevious.emit();
  }

  onNextAction() {
    this.onNext.emit();
  }
}
