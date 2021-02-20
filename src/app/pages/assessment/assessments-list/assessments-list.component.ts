import { Component, OnInit } from '@angular/core';
import { Assessment } from '../@types/assessment';
import { assessmentTable } from '@app/pages/assessment/@tables/assessment.table';
import { AssessmentService } from '@app/pages/assessment/@services/assessment.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';
import { DateService } from '@shared/services/date.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { User } from '@app/pages/user-management/@types/user';
import { AssessmentFilter } from '@app/pages/assessment/@types/assessment-filter';
import { PermissionKey } from '@app/@shared/@types/permission';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-planned-assessment',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss'],
})
export class AssessmentsListComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  modalLoading = false;
  assessments: Assessment[] = [];
  paging: Paging = {
    first: 10,
  };
  filter: AssessmentFilter = {};
  pageInfo: any;
  assessmentsTable: { columns: any[]; rows: Assessment[] } = {
    columns: assessmentTable.columns,
    rows: [],
  };
  actions = assessmentTable.actions;

  constructor(
    private assessmentsService: AssessmentService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private dateService: DateService,
    private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getAssessments();
  }

  getAssessments(paging?: Paging, sorting: Sorting[] = []) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (!this.perms.permissionsOnly([PermissionKey.MANAGE_ASSESSMENTS])) {
      this.filter = {
        ...this.filter,
        clinicianId: { eq: user.id },
      };
    }
    this.isLoading = true;
    this.assessments = [];
    const _assessments: any[] = [];
    this.assessmentsService.getAssessments({ filter: this.filter, paging, sorting }).subscribe(
      async ({ data }) => {
        const assessments = data.assessments;
        assessments.edges.map((assessment: any) => {
          const row = Object.assign({}, assessment.node);

          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'active' : 'inactive';
          _assessments.push({
            name: row.name,
            firstName: row.patient.firstName,
            lastName: row.patient.lastName,
            medicalRecordNo: row.patient.medicalRecordNo,
            clinician: `${row.clinician.firstName} ${row.clinician.lastName}`,
            plannedDate: row.createdAt ? this.dateService.formatDate(row.createdAt) : '',
            active: `<nz-tag class="${color}">${active}</nz-tag>`,
            firstVisit: '',
          });
          this.assessments.push(assessment.node);
        });

        this.assessmentsTable.rows = _assessments;
        this.paging.after = data.assessments.pageInfo.endCursor;
        this.paging.before = data.assessments.pageInfo.startCursor;
        this.pageInfo = data.assessments.pageInfo;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  searchAssesments(searchString: string) {
    this.filter.or = [{ name: { iLike: `%${searchString}%` } }];
    this.getAssessments({ first: 10 });
  }

  navigatePages(direction: string, pageSize: number = 10) {
    switch (direction) {
      case 'next':
        this.paging.before = undefined;
        this.paging.first = pageSize;
        this.paging.last = undefined;
        break;
      case 'previous':
        this.paging.after = undefined;
        this.paging.first = undefined;
        this.paging.last = pageSize;
        break;
    }
    this.getAssessments(this.paging);
  }

  deleteAssessment(assessment: Assessment) {
    this.modalLoading = true;
    this.assessmentsService.deleteAssessment(assessment).subscribe(
      async ({ data }) => {
        const deletedIndex = this.assessments.findIndex((_assessment) => _assessment.id === assessment.id);
        this.assessments.splice(deletedIndex, 1);
        this.assessmentsTable.rows.splice(deletedIndex, 1);
        this.modalLoading = false;
        this.message.create('success', `assessment has been successfully deleted`);
      },
      (error) => {
        this.modalLoading = false;
        this.message.create(
          'error',
          `could not remove assessment for ${assessment.patient.firstName} ${assessment.patient.lastName}`
        );
      }
    );
  }

  handleActionClick(event: any): void {
    switch (event.action.name) {
      case 'Delete Assessment':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete assessment for
               <b>${this.assessments[event.index].patient.firstName} ${
            this.assessments[event.index].patient.lastName
          }</b>`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteAssessment(this.assessments[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
        break;
      case 'Do Assessment':
        this.router.navigate(['/assessment']);
        break;
      case 'View Results':
        console.log('view results');
        break;
      case 'Go to Report':
        console.log('Go to Report');
        break;
    }
  }

  handleRowClick(event: any) {
    const dataString = CryptoJS.AES.encrypt(
      JSON.stringify(this.assessments[event.index]),
      environment.secretKey
    ).toString();
    this.router.navigate(['/mhira/assessments/plan-assessments'], {
      state: {
        title: `${this.assessments[event.index].name}`,
      },
      queryParams: {
        assessment: dataString,
      },
    });
  }
}
