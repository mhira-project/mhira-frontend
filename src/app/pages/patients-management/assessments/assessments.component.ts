import { Component, Input, OnInit } from '@angular/core';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { AssessmentsPatientsTable } from '@app/pages/patients-management/@tables/assessments.table';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { finalize } from 'rxjs/operators';
import { Convert } from '@shared/classes/convert';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { AssessmentService } from '@app/pages/patients-management/@services/assessment.service';
import { PageInfo } from '../../../@shared/@types/paging';
import { FormattedAssessment } from '@app/pages/assessment/@types/assessment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocationStrategy } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from '@app/pages/user-management/@types/user';

const CryptoJS = require('crypto-js');

enum ActionKey {
  SHOW_ASSESSMENT,
  COPY_ASSESSMENT_LINK,
  ARCHIVE_ASSESSMENT,
  RESTORE_ASSESSMENT,
  DELETE_ASSESSMENT,
  SCAN_QR_CODE
}

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss'],
})
export class AssessmentsComponent implements OnInit {
  @Input() public patient: FormattedPatient;
  public actions: Action<ActionKey>[] = [
    { key: ActionKey.SHOW_ASSESSMENT, title: 'Start Session' },
    { key: ActionKey.COPY_ASSESSMENT_LINK, title: 'Copy Session Link' },
    { key: ActionKey.ARCHIVE_ASSESSMENT, title: 'Archive Session' },
    { key: ActionKey.RESTORE_ASSESSMENT, title: 'Restore Session' },
    { key: ActionKey.DELETE_ASSESSMENT, title: 'Delete Session' },
    { key: ActionKey.SCAN_QR_CODE, title: 'Scan QR Code' },
  ];
  public filter: CaseManagerFilter;
  public data: FormattedAssessment[];
  public currentFilters = false;
  public cacheFilters = JSON.parse(localStorage.getItem('filter-patient-assessment'));
  public columns: TableColumn<FormattedAssessment>[] = AssessmentsPatientsTable;
  public user: User;
  public isLoading = false;
  public onlyArchivedAssessments = (localStorage.getItem('onlyArchivedAssessmentsPatients') === 'true');
  isVisible = false;
  newUrl : URL;
  modalData : any = '';
  statusFilter = '';
  public pageInfo: PageInfo;
  public onlyMyAssessments = (localStorage.getItem('onlyMyAssessmentsPatients') === 'true');

  public assessmentRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private errorService: ErrorHandlerService,
    private clipboardService: ClipboardService,
    private messageService: NzMessageService,
    private locationStrategy: LocationStrategy,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getAssessments();

    if(!localStorage.getItem('onlyMyAssessmentsPatients')){
      localStorage.setItem('onlyMyAssessmentsPatients', this.onlyMyAssessments.toString());
    }
    if(!localStorage.getItem('onlyArchivedAssessmentsPatients')){
      localStorage.setItem('onlyArchivedAssessmentsPatients', this.onlyArchivedAssessments.toString());
    }
    if(!localStorage.getItem('filter-patient-assessment')){
        localStorage.setItem('filter-patient-assessment', JSON.stringify(this.assessmentRequestOptions.filter));
    }
    if(!localStorage.getItem('sorting-patient-assessment')){
        localStorage.setItem('sorting-patient-assessment', JSON.stringify(this.assessmentRequestOptions.sorting));
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
    localStorage.setItem('filter-patient-assessment', JSON.stringify(this.assessmentRequestOptions.filter));
    this.getAssessments();
    this.currentFilters = true;
  }

  public onSearch(searchString: string): void {
    this.assessmentRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getAssessments();
  }

  public onStatusSelect(): any{
    if(this.assessmentRequestOptions.filter.and) {
      const filters = {
        ...this.assessmentRequestOptions.filter, 
        and: [...this.assessmentRequestOptions.filter.and, {status: {eq: this.statusFilter}}]};
    } else {
        const filters = {
          ...this.assessmentRequestOptions.filter, 
          and: [{status: {eq: this.statusFilter}}]};
    }
    this.getAssessments();
    this.currentFilters = true;
  }

  public onAction({ action, context: assessment }: ActionArgs<FormattedAssessment, ActionKey>): void {
    switch (action.key) {
      case ActionKey.SHOW_ASSESSMENT:
        this.showAssessment(assessment);
        return;
      case ActionKey.COPY_ASSESSMENT_LINK:
        this.copyAssessmentLink(assessment);
        return;
      case ActionKey.ARCHIVE_ASSESSMENT:
        this.archiveAssessment(assessment);
        return;
      case ActionKey.RESTORE_ASSESSMENT:
        this.restoreAssessment(assessment);
        return;  
      case ActionKey.DELETE_ASSESSMENT:
        this.deleteAssessment(assessment, false);
        return;
      case ActionKey.SCAN_QR_CODE:
        this.modalData = assessment
        this.newUrl = new URL(this.generateAssessmentURL(assessment.uuid), window.location.origin);
        this.showModal()
        return;  
    }
  }
  public onMyAssessments(): void {
    if(this.onlyMyAssessments === true){
      localStorage.setItem('onlyMyAssessmentsPatients', 'false');
      this.onlyMyAssessments = false;
    }
    else{
      localStorage.setItem('onlyMyAssessmentsPatients', 'true');
      this.onlyMyAssessments = true;
    }
    this.getAssessments();
  }

  public onArchivedAssessments(): void {
    if(this.onlyArchivedAssessments === true){
      localStorage.setItem('onlyArchivedAssessmentsPatients', 'false');
      this.onlyArchivedAssessments = false;
    }
    else{
      localStorage.setItem('onlyArchivedAssessmentsPatients', 'true');
      this.onlyArchivedAssessments = true;
    }
    this.getAssessments();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  navigate() {
    this.router.navigate(['/mhira/case-management/create-assessment']);
  }

  public onPatientSelect(): void {
    console.log(this.patient);
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.patient), environment.secretKey).toString();
    this.router.navigate(['/mhira/case-management/create-assessment'], {
      queryParams: {
        profile: dataString,
      },
    });
  }

  public onAssessmentSelect(assessment: FormattedAssessment): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(assessment), environment.secretKey).toString();
    this.router.navigate(['/mhira/case-management/create-assessment'], {
      queryParams: {
        assessment: dataString,
      },
    });
  }

  private showAssessment({ uuid }: FormattedAssessment): void {
    window.open(this.generateAssessmentURL(uuid));
  }

  private generateAssessmentURL(assesmentUuid: string): string {
    const cryptoId = CryptoJS.AES.encrypt(assesmentUuid, environment.secretKey).toString();
    const tree = this.router.createUrlTree(['/assessment/overview'], { queryParams: { assessment: cryptoId } });
    return this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree));
  }

  private copyAssessmentLink({ uuid }: FormattedAssessment): void {
    const url = new URL(this.generateAssessmentURL(uuid), window.location.origin);
    this.clipboardService.copy(url.toString());
    this.messageService.create('success', 'Assessment link copied to clipboard');
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<FormattedAssessment>]: {} }> {
    if (!searchString) return [];
    return [
      {
        assessmentType: {
            or: [
                {
                    name: {
                        iLike: `%${searchString}%`
                    }
                }
            ]
        }
      },
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

  private getAssessments(): void {
    // copy to not modify original options
    const options = { ...this.assessmentRequestOptions };

    if(localStorage.getItem('filter-patient-assessment')){
      options.filter = {...options.filter, ...JSON.parse(localStorage.getItem('filter-patient-assessment'))}
    }

    if(options.sorting.length === 0){
      options.sorting.push({field: 'createdAt', direction: 'DESC'})
    }

    if(!this.onlyArchivedAssessments){
      options.filter = {
        ...options.filter,
        and: [{ deleted: {is: false} }, ...(options.filter.and ?? [])],
      };
    } 

    options.filter = {
      ...options.filter,
      and: [{ patient: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };

    // apply for only my patients
    if (this.onlyMyAssessments)
      options.filter = {
        ...options.filter,
        and: [{ clinician: { id: { eq: this.userId } } }, ...(options.filter.and ?? [])],
      };

    // apply for archived assessments
    if (this.onlyArchivedAssessments){
      options.filter = {
        ...options.filter,
        and: [{ deleted: {is: true} }, ...(options.filter.and ?? [])],
      };
    }

    // apply for assessment status
    if(this.statusFilter) {
      options.filter = {...options.filter, and: [...options.filter.and, {status: {eq: this.statusFilter}}]}
    }

    this.isLoading = true;
    this.assessmentService
      .getAssessments(options)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ edges, pageInfo }) => {
          this.data = edges.map((e: any) => Convert.toFormattedAssessment(e.node));
          this.pageInfo = pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load assessments' })
      );
  }

  private async archiveAssessment(assessment : FormattedAssessment) {
    const modal = this.modalService.confirm({
        nzOnOk: () => true,
        nzTitle: 'Archive Assessment',
        nzContent: `
        Are you sure you want to archive ${
            assessment.name
        }?`
    });

    const confirmation = await modal.afterClose.toPromise();
    if (! confirmation) 
        return;
    

    this.isLoading = true;
    this.assessmentService.archiveAssessment(assessment).pipe(finalize(() => (this.isLoading = false))).subscribe((archived) => {
        if (!archived) {
            this.getAssessments();
        } else {
            this.getAssessments();
        }
    }, (error) => this.errorService.handleError(error, {prefix: `Unable to archive assessment "${
            assessment.name
        }"`}));
  }

  private async restoreAssessment(assessment : FormattedAssessment) {
    const modal = this.modalService.confirm({
        nzOnOk: () => true,
        nzTitle: 'Restore Assessment',
        nzContent: `
        Are you sure you want to restore ${
            assessment?.name
        }?`
    });

    const confirmation = await modal.afterClose.toPromise();
    if (! confirmation) 
        return;
    

    this.isLoading = true;
    this.assessmentService.restoreAssessment(assessment).pipe(finalize(() => (this.isLoading = false))).subscribe((archived) => {
        if (!archived) {
            this.getAssessments();
        } else {
            this.getAssessments();
        }
    }, (error) => this.errorService.handleError(error, {prefix: `Unable to restore assessment "${
            assessment.name
        }"`}));
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

    this.isLoading = true;
    this.assessmentService
      .deleteAssessment(assessment, archive)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (archived) => {
          if (!archived) {
            this.getAssessments();
          } else {
            this.getAssessments();
          }
        },
        (error) => this.errorService.handleError(error, { prefix: `Unable to delete assessment "${assessment.name}"` })
      );
  }

  private get userId(): number {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user.id ?? 0;
  }
}
