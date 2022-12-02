import { Component, OnInit } from '@angular/core';
import { PatientStatus } from '@app/pages/patients-management/@types/patient-status';
import { Paging } from '@shared/@types/paging';
import { PatientStatusesTable } from '@app/pages/administration/@tables/patient-statuses.table';
import { PatientStatusForm } from '@app/pages/administration/@forms/patient-status.form';
import { PatientStatusesService } from '@app/pages/patients-management/@services/patient-statuses.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientStatusModel } from '@app/pages/administration/settings/@models/patient-status.model';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { PermissionKey } from '@shared/@types/permission';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getPatientStatuses();
  }

  getPatientStatuses(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.patientStatuses = [];
    this.patientStatusesTable.rows = [];
    this.patientStatusesService
      .patientStatuses(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          data.patientStatuses.edges.map((patientStatus: any) => {
            this.patientStatuses.push(PatientStatusModel.fromJson(patientStatus.node));
          });
          this.patientStatusesTable.rows = this.patientStatuses;
          this.paging.after = data.patientStatuses.pageInfo.endCursor;
          this.paging.before = data.patientStatuses.pageInfo.startCursor;
          this.pageInfo = data.patientStatuses.pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to get patient statuses' })
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
    this.patientStatusesService
      .createPatientStatus(patientStatus)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.patientStatuses.unshift(PatientStatusModel.fromJson(data.createOnePatientStatus));
          this.patientStatusesTable.rows = this.patientStatuses;
          this.toggleCreatePanel();
          this.getPatientStatuses();
          this.message.create('success', `PatientStatus has successfully been created`);
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to create patient status' })
      );
  }

  updatePatientStatus(patientStatus: PatientStatus) {
    this.isLoading = true;

    this.patientStatusesService
      .updatePatientStatus(patientStatus)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          const newPatientStatus = data.updateOnePatientStatus;
          this.patientStatuses[this.selectedIndex] = PatientStatusModel.fromJson(newPatientStatus);
          this.toggleCreatePanel();
          this.getPatientStatuses();
          this.message.success('Patient status has been successfully edited', {
            nzDuration: 3000,
          });
        },
        (error) =>
          this.errorService.handleError(error, { prefix: `Unable to update patient status "${patientStatus.name}"` })
      );
  }

  deletePatientStatus(patientStatus: PatientStatus) {
    this.modalLoading = true;
    this.patientStatusesService
      .deletePatientStatus(patientStatus)
      .pipe(finalize(() => (this.modalLoading = false)))
      .subscribe(
        () => {
          this.patientStatuses.splice(this.selectedIndex, 1);
          this.message.create('success', `patientStatus has been successfully deleted`);
        },
        (error: any) =>
          this.errorService.handleError(error, { prefix: `Unable to remove patient status "${patientStatus.name}"` })
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
