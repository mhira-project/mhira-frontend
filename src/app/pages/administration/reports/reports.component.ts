import { Component, OnInit } from '@angular/core';
import { PermissionKey } from '@shared/@types/permission';
import { FormattedReport, Reports } from '@app/pages/administration/@types/reports';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { ReportsColumns } from '@app/pages/administration/@tables/reports.table';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { ReportsService } from '@app/pages/administration/@services/reports.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { ReportsModel } from '@app/pages/administration/@models/reports.model';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

enum ActionKey {
  EDIT_REPORT,
  DELETE_REPORT,
}

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public PK = PermissionKey;

  public data: Partial<FormattedReport>[];
  public columns: TableColumn<Partial<Reports>>[] = ReportsColumns;
  public isLoading = false;

  public reportsRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };
  public pageInfo: PageInfo;
  public actions: Action<ActionKey>[] = [];

  constructor(
    private reportsService: ReportsService,
    private errorService: ErrorHandlerService,
    private modalService: NzModalService,
    public perms: AppPermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReports();
    this.actions = [
      { key: ActionKey.DELETE_REPORT, title: 'Delete Report' },
    ];
  }

  public handleRowClick(event: any) {
    this.onReportSelect(event);
  }

  public onPageChange(paging: Paging): void {
    this.reportsRequestOptions.paging = paging;
    this.getReports();
  }

  public onSort(sorting: SortField<FormattedReport>[]): void {
    this.reportsRequestOptions.sorting = sorting;
    this.getReports();
  }

  public onFilter(filter: Filter): void {
    this.reportsRequestOptions.filter = filter;
    this.getReports();
  }

  public onSearch(searchString: string): void {
    this.reportsRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getReports();
  }

  public onReportSelect(report: FormattedReport): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(report), environment.secretKey).toString();
    this.router.navigate(['/mhira/administration/create-report'], {
      queryParams: {
        report: dataString,
      },
    });
  }

  public onAction({ action, context: report }: ActionArgs<FormattedReport, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT_REPORT:
        if (this.perms.permissionsOnly(PermissionKey.MANAGE_REPORTS)) {
          this.onReportSelect(report);
        }
        return;
      case ActionKey.DELETE_REPORT:
        if (this.perms.permissionsOnly(PermissionKey.DELETE_REPORTS)) {
          this.deleteReport(report);
        }
        return;
    }
  }

  navigate() {
    this.router.navigate(['/mhira/administration/create-report']);
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<Reports>]: {} }> {
    if (!searchString) return [];
    return [{ name: { iLike: `%${searchString}%` } }, { description: { iLike: `%${searchString}%` } }];
  }

  private getReports(): void {
    this.isLoading = true;
    this.reportsService
      .reports(this.reportsRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.reports.edges.map((report: any) => ReportsModel.fromJson(report.node));
          console.log('this.data', this.data);
          this.pageInfo = data.reports.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load reports' })
      );
  }

  private async deleteReport(report: FormattedReport): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete report',
      nzContent: `
        Are you sure you want to delete ${report.name}? This action is irreversible.
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.reportsService
      .deleteReport(report)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const data = [...this.data];
          data.splice(this.data.indexOf(report), 1);
          this.data = data; // mutate reference to trigger change detection
        },
        (err) => this.errorService.handleError(err, { prefix: `Unable to delete caregiver "${report.name}"` })
      );
  }
}
