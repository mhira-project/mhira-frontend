import { Component } from '@angular/core';
import { AssessmentService } from '@app/pages/assessment/@services/assessment.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import {
  TableColumn,
  Action,
  DEFAULT_PAGE_SIZE,
  SortField,
  ActionArgs,
} from '../../../@shared/@modules/master-data/@types/list';
import { FormattedAssessment } from '../@types/assessment';
import { AssessmentTable } from '../@tables/assessment.table';
import { Convert } from '../../../@shared/classes/convert';
import { PageInfo } from '../../../@shared/@types/paging';
import { finalize } from 'rxjs/operators';
import { Filter } from '../../../@shared/@types/filter';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { User } from '@app/pages/user-management/@types/user';
import { NzModalService } from 'ng-zorro-antd/modal';

const CryptoJS = require('crypto-js');

enum ActionKey {
  SHOW_ASSESSMENT,
  ARCHIVE_ASSESSMENT,
  DELETE_ASSESSMENT,
}

@Component({
  selector: 'app-planned-assessment',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss'],
})
export class AssessmentsListComponent {
  PK = PermissionKey;
  public columns: TableColumn<FormattedAssessment>[] = AssessmentTable;
  public data: FormattedAssessment[];
  public pageInfo: PageInfo;
  public loading = false;
  public actions: Action<ActionKey>[] = [{ key: ActionKey.SHOW_ASSESSMENT, title: 'Show Assessment' }];
  public onlyMyAssessments = false;

  public assessmentRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(
    private assessmentService: AssessmentService,
    private router: Router,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService
  ) {
    this.getAssessments();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_ASSESSMENTS)) {
      this.actions.push({ key: ActionKey.ARCHIVE_ASSESSMENT, title: 'Archive Assessment' });
    }
    if (this.perms.permissionsOnly(PermissionKey.DELETE_ASSESSMENTS)) {
      this.actions.push({ key: ActionKey.DELETE_ASSESSMENT, title: 'Delete Assessment' });
    }
  }

  public onPageChange(paging: Paging): void {
    this.assessmentRequestOptions.paging = paging;
    this.getAssessments();
  }

  public onSort(sorting: SortField<FormattedAssessment>[]): void {
    this.assessmentRequestOptions.sorting = sorting;
    this.getAssessments();
  }

  public onFilter(filter: Filter): void {
    this.assessmentRequestOptions.filter = filter;
    this.getAssessments();
  }

  public onSearch(searchString: string): void {
    this.assessmentRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getAssessments();
  }

  public onAction({ action, context: assessment }: ActionArgs<FormattedAssessment, ActionKey>): void {
    switch (action.key) {
      case ActionKey.SHOW_ASSESSMENT:
        this.showAssessment(assessment);
        return;
      case ActionKey.ARCHIVE_ASSESSMENT:
        this.deleteAssessment(assessment);
        return;
      case ActionKey.DELETE_ASSESSMENT:
        this.deleteAssessment(assessment, false);
        return;
    }
  }

  public onAssessmentSelect(assessment: FormattedAssessment): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(assessment), environment.secretKey).toString();
    this.router.navigate(['/mhira/assessments/plan-assessments'], {
      queryParams: {
        assessment: dataString,
      },
    });
  }

  public onMyAssessments(): void {
    this.onlyMyAssessments = !this.onlyMyAssessments;
    this.getAssessments();
  }

  private getAssessments(): void {
    // copy to not modify original options
    const options = { ...this.assessmentRequestOptions };

    // apply for only my patients
    if (this.onlyMyAssessments)
      options.filter = {
        ...options.filter,
        and: [{ clinician: { id: { eq: this.userId } } }, ...(options.filter.and ?? [])],
      };

    this.loading = true;
    this.assessmentService
      .getAssessments(options)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        ({ edges, pageInfo }) => {
          this.data = edges.map((e: any) => Convert.toFormattedAssessment(e.node));
          this.pageInfo = pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load assessments' })
      );
  }

  private async deleteAssessment(assessment: FormattedAssessment, archive: boolean = true): Promise<void> {
    // create confirmation modal
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete Assessment',
      nzContent: `
        Are you sure you want to delete ${assessment.name}? This action is irreversible
      `,
    });

    // wait for modal to successfully complete
    const confirmation = await modal.afterClose.toPromise();
    if (!confirmation) return;

    this.loading = true;
    this.assessmentService
      .deleteAssessment(assessment, archive)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (archived) => {
          if (!archived) this.data.splice(this.data.indexOf(assessment), 1);
        },
        (error) => this.errorService.handleError(error, { prefix: `Unable to delete assessment "${assessment.name}"` })
      );
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<FormattedAssessment>]: {} }> {
    if (!searchString) return [];
    return [
      { name: { iLike: `%${searchString}%` } },
      { informant: { iLike: `%${searchString}%` } },
      {
        patient: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
            { medicalRecordNo: { iLike: `%${searchString}%` } },
          ],
        },
      },
      {
        clinician: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
            { workID: { iLike: `%${searchString}%` } },
          ],
        },
      },
    ];
  }

  private async showAssessment(assessment: FormattedAssessment): Promise<void> {
    const cryptoId = CryptoJS.AES.encrypt(JSON.stringify(assessment.id), environment.secretKey).toString();
    const tree = this.router.createUrlTree(['/assessment/overview'], { queryParams: { assessment: cryptoId } });
    window.open('#' + tree.toString());
  }

  private get userId(): number {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user.id ?? 0;
  }
}
