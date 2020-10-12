import { Component, OnInit } from '@angular/core';
import { Assessment } from '../@types/assessment';
import { assessmentTable } from '@app/pages/assessment/@tables/assessment.table';
import { AssessmentService } from '@app/pages/assessment/@services/assessment.service';
import * as moment from 'moment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-planned-assessment',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss'],
})
export class AssessmentsListComponent implements OnInit {
  isLoading = false;
  modalLoading = false;
  assessments: Assessment[] = [];
  assessmentsTable: { columns: any[]; rows: Assessment[] } = {
    columns: assessmentTable.columns,
    rows: [],
  };
  actions = assessmentTable.actions;

  constructor(
    private assessmentsService: AssessmentService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssessments();
  }

  getAssessments() {
    this.isLoading = true;
    this.assessments = [];
    const _assessments: any[] = [];
    this.assessmentsService.getAssessments().subscribe(
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
            plannedDate: row.createdAt ? moment(row.createdAt).format('DD-MM-YYYY HH:mm') : '',
            active: `<nz-tag class="${color}">${active}</nz-tag>`,
            firstVisit: '',
          });
          this.assessments.push(assessment.node);
        });

        this.assessmentsTable.rows = _assessments;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
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
      case 'Edit Assessment':
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
        break;
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
}
