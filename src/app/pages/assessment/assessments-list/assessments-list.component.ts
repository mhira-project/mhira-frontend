import { Component, OnInit } from '@angular/core';
import { patientForms } from '@app/pages/home/@forms/patient-forms';
import { Assessment } from '../@types/assessment';
import { assessmentTable } from '@app/pages/assessment/@tables/assessment.table';
import { AssessmentService } from '@app/pages/assessment/@services/assessment.service';
import * as moment from 'moment';
import { environment } from '@env/environment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

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
    private message: NzMessageService
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
        const assessments = data.getAssessments;
        assessments.edges.map((assessment: any) => {
          const row = Object.assign({}, assessment.node);

          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'active' : 'inactive';
          row.plannedDate = row.plannedDate ? moment(row.plannedDate).format('DD-MM-YYYY HH:mm') : '';
          row.firstVisit = row.firstVisit ? moment(row.firstVisit).format('DD-MM-YYYY HH:mm') : '';
          row.clinician = `${row.clinician.firstName} ${row.clinician.lastName}`;
          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          _assessments.push(row);
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
        this.message.create('success', `${assessment.firstName} ${assessment.lastName} has been successfully deleted`);
      },
      (error) => {
        // to be removed when api is available
        const deletedIndex = this.assessments.findIndex((_assessment) => _assessment.id === assessment.id);
        this.assessments.splice(deletedIndex, 1);
        this.assessmentsTable.rows.splice(deletedIndex, 1);

        this.modalLoading = false;
        this.message.create('success', `${assessment.firstName} ${assessment.lastName} has been successfully deleted`);
      }
    );
  }

  handleActionClick(event: any): void {
    switch (event.action.name) {
      case 'Delete Assessment':
        const rows = this.assessmentsTable.rows;
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete assessment for ${rows[event.index].firstName} ${
            rows[event.index].lastName
          }`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteAssessment(rows[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
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