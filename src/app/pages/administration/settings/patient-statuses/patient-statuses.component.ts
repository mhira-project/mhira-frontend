import { Component, OnInit } from '@angular/core';
import { PatientStatus } from '@app/pages/patients-management/@types/patient-status';
import { Paging } from '@shared/@types/paging';
import { PatientStatusesTable } from '@app/pages/administration/settings/@tables/patient-statuses.table';
import { PatientStatusForm } from '@app/pages/administration/settings/@forms/patient-status.form';
import { PatientStatusesService } from '@app/pages/patients-management/@services/patient-statuses.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientStatusModel } from '@app/pages/administration/settings/@models/patient-status.model';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { PermissionKey } from '../../../../@shared/@types/permission';

@Component({
  selector: 'app-patient-statuses',
  templateUrl: './patient-statuses.component.html',
  styleUrls: ['./patient-statuses.component.scss'],
})
export class PatientStatusesComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  modalLoading = false;
  patientStatuses: PatientStatus[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  patientStatusesTable: { columns: any[]; rows: PatientStatus[] } = {
    columns: PatientStatusesTable.columns,
    rows: [],
  };
  actions = PatientStatusesTable.actions;

  showCreatePatientStatus = false;
  panelTitle = 'Create PatientStatus';
  loadingMessage = '';
  patientStatusForms = PatientStatusForm;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;
  selectedIndex = -1;

  constructor(
    private patientStatusesService: PatientStatusesService,
    private modalService: NzModalService,
    private message: NzMessageService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getPatientStatuses();
  }

  getPatientStatuses(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.patientStatuses = [];
    this.patientStatusesTable.rows = [];
    this.patientStatusesService.patientStatuses(params).subscribe(
      async ({ data }: any) => {
        data.patientStatuses.edges.map((patientStatus: any) => {
          this.patientStatuses.push(PatientStatusModel.fromJson(patientStatus.node));
        });
        this.patientStatusesTable.rows = this.patientStatuses;
        this.paging.after = data.patientStatuses.pageInfo.endCursor;
        this.paging.before = data.patientStatuses.pageInfo.startCursor;
        this.pageInfo = data.patientStatuses.pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
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
    this.getPatientStatuses({ paging: this.paging });
  }

  toggleCreatePanel(create: boolean = true) {
    this.isCreateAction = create;
    this.showCreatePatientStatus = !this.showCreatePatientStatus;
    this.panelTitle = this.isCreateAction ? 'Create PatientStatus' : 'Update PatientStatus';
    if (create) {
      this.resetForm();
    }
  }

  resetForm() {
    this.selectedIndex = -1;
    this.patientStatusForms.groups.map((group) => {
      group.fields.map((field) => {
        field.value = null;
      });
    });
  }

  handleActionClick(event: any): void {
    this.selectedIndex = event.index;
    switch (event.action.name) {
      case 'Edit PatientStatus':
        this.patientStatusForms.groups.map((group) => {
          group.fields.map((field) => {
            field.value = this.patientStatuses[event.index][field.name];
          });
        });
        this.toggleCreatePanel(false);
        break;
      case 'Delete PatientStatus':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete patientStatus for
               <b>${this.patientStatuses[event.index].name}</b>`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deletePatientStatus(this.patientStatuses[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  createPatientStatus(patientStatus: PatientStatus) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Creating patientStatus ${patientStatus.name}`;
    this.patientStatusesService.createPatientStatus(patientStatus).subscribe(
      async ({ data }) => {
        this.patientStatuses.unshift(PatientStatusModel.fromJson(data.createOnePatientStatus));
        this.patientStatusesTable.rows = this.patientStatuses;
        this.isLoading = false;
        this.loadingMessage = '';
        this.toggleCreatePanel();
        this.message.create('success', `PatientStatus has successfully been created`);
      },
      (error) => {
        this.hasErrors = true;
        // this.errors = error.graphQLErrors.map(x => x.message);
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  updatePatientStatus(patientStatus: PatientStatus) {
    this.isLoading = true;

    this.patientStatusesService.updatePatientStatus(patientStatus).subscribe(
      ({ data }) => {
        const newPatientStatus = data.updateOnePatientStatus;
        this.patientStatuses[this.selectedIndex] = PatientStatusModel.fromJson(newPatientStatus);
        this.isLoading = false;
        this.toggleCreatePanel();
        this.message.success('PatientStatus has been successfully edited', {
          nzDuration: 3000,
        });
      },
      (error) => {
        // this.errors = error.graphQLErrors.map(x => x.message);
        this.isLoading = false;
      }
    );
  }

  deletePatientStatus(patientStatus: PatientStatus) {
    this.modalLoading = true;
    this.patientStatusesService.deletePatientStatus(patientStatus).subscribe(
      async ({ data }: any) => {
        this.patientStatuses.splice(this.selectedIndex, 1);
        this.modalLoading = false;
        this.message.create('success', `patientStatus has been successfully deleted`);
      },
      (error: any) => {
        this.modalLoading = false;
        this.message.create('error', `could not remove patientStatus for ${patientStatus.name}`);
      }
    );
  }

  submitForm(patientStatus: PatientStatus) {
    if (this.isCreateAction) {
      this.createPatientStatus(patientStatus);
    } else {
      patientStatus.id = this.patientStatuses[this.selectedIndex].id;
      this.updatePatientStatus(patientStatus);
    }
  }
}
