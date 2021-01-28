import { Component, OnInit, OnChanges } from '@angular/core';
import { Patient } from '../@types/patient';
import { table } from '../@tables/patients.table';
import { PatientsService } from '@app/pages/patients-management/@services/patients.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Paging } from '@shared/@types/paging';
import { Form } from '@shared/components/form/@types/form';
import { DateService } from '@shared/services/date.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { PatientFilterForm } from '@app/pages/patients-management/@forms/patients-filter.form';
import { PatientFilter } from '@app/pages/patients-management/@types/patient-filter';
import { NzMessageService, NzTableQueryParams } from 'ng-zorro-antd';
import { Sorting } from '@shared/@types/sorting';
import { PatientStatus } from '@app/pages/patients-management/@types/patient-status';
import { PatientStatusesService } from '@app/pages/patients-management/@services/patient-statuses.service';
import { PaginationService } from '@shared/services/pagination.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-patients',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit, OnChanges {
  isLoading = false;
  isVisible = false;
  isOkLoading = false;
  isVisibleStatusModal = false;
  patients: any[] = [];
  patientStatues: PatientStatus[] = [];
  filter: PatientFilter = {};
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  showFilterPanel = false;
  patientFilterForm: Form = PatientFilterForm;
  patientsTable: { columns: any[]; rows: Patient[] } = {
    columns: table.columns,
    rows: [],
  };
  actions = table.actions;
  currentPatientIndex: number;
  statusId: number;
  errors: string[];

  constructor(
    private patientsService: PatientsService,
    private patientStatusesService: PatientStatusesService,
    private dateService: DateService,
    private message: NzMessageService,
    private router: Router,
    public perms: AppPermissionsService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    // to be called from the sort fuction
    // this.getPatients(this.paging);
    this.getPatientStatuses();
  }

  loadPermissions() {
    if (!this.perms.permissionsOnly('manage patients')) {
      this.actions = [];
    }
  }

  ngOnChanges() {}

  closeFilterPanel() {
    this.showFilterPanel = false;
  }

  showFilterPanelAction() {
    this.showFilterPanel = true;
  }

  getPatients(paging: Paging, sorting: Sorting[] = []) {
    this.isLoading = true;
    this.patients = [];
    this.patientsService.patients({ filter: this.filter, paging, sorting }).subscribe(
      async ({ data }) => {
        data.patients.edges.map((patient: any) => {
          this.patients.push(PatientModel.fromJson(patient.node));
        });
        this.patientsTable.rows = this.patients;
        this.paging.after = data.patients.pageInfo.endCursor;
        this.paging.before = data.patients.pageInfo.startCursor;
        this.pageInfo = data.patients.pageInfo;
        this.isLoading = false;
        this.closeFilterPanel();
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  getPatientStatuses() {
    this.patientStatues = [];
    this.patientStatusesService.patientStatuses().subscribe(
      async ({ data }) => {
        data.patientStatuses.edges.map((status: any) => {
          this.patientStatues.push(status.node);
        });
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  navigatePages(direction: 'next' | 'previous', pageSize: number = 10) {
    this.paging = this.paginationService.navigatePages(this.paging, direction, pageSize);
    this.getPatients(this.paging);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCreatePatient(): void {
    this.router.navigate(['/mhira/home/profile']);
  }

  handleActionClick(event: any): void {
    this.currentPatientIndex = event.index;
    switch (event.action.name) {
      case 'Delete Patient':
        this.isVisible = true;
        break;

      case 'Change Status':
        this.statusId = this.patients[event.index].statusId;
        this.isVisibleStatusModal = true;
        break;
    }
  }

  handleRowClick(event: any) {
    const dataString = CryptoJS.AES.encrypt(
      JSON.stringify(this.patients[event.index]),
      environment.secretKey
    ).toString();
    this.router.navigate(['/mhira/home/profile'], {
      state: {
        title: `${this.patients[event.index].firstName} ${this.patients[event.index].lastName}`,
      },
      queryParams: {
        profile: dataString,
      },
    });
  }

  updatePatient(patient: Patient) {
    this.isOkLoading = true;
    this.errors = [];
    patient.statusId = this.statusId;
    this.patientsService.updatePatient(PatientModel.updateData(patient)).subscribe(
      async ({ data }) => {
        patient = PatientModel.fromJson(data.updateOnePatient);
        this.patients[this.currentPatientIndex] = patient;
        this.isVisibleStatusModal = false;
        this.isOkLoading = false;
        this.message.success('Patient has successful been updated', {
          nzDuration: 3000,
        });
      },
      (error) => {
        for (const gqlError of error.graphQLErrors) {
          this.errors.push(gqlError.message);
        }
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.error('An error occurred could not update patient', {
          nzDuration: 3000,
        });
      }
    );
  }

  deletePatient() {
    this.isOkLoading = true;
    const patient = this.patients[this.currentPatientIndex];
    this.patientsService.deletePatient(patient).subscribe(
      async ({ data }) => {
        const deletedIndex = this.patients.findIndex((_patient) => _patient.id === patient.id);
        this.patients.splice(deletedIndex, 1);
        this.patientsTable.rows.splice(deletedIndex, 1);
        this.isVisible = false;
        this.isOkLoading = false;
      },
      (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        for (const gqlError of error.graphQLErrors) {
          this.errors.push(gqlError.message);
        }
        this.message.error('An error occurred could not delete patient', {
          nzDuration: 3000,
        });
      }
    );
  }

  searchPatients(searchString: string) {
    this.filter.or = [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      {
        informants: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
      {
        caseManagers: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
      { medicalRecordNo: { iLike: `%${searchString}%` } },
    ];
    this.getPatients({ first: 10 });
  }

  sortPatients(params: NzTableQueryParams) {
    const sorting: Sorting[] = [];
    params.sort.map((item: { key: string; value: string }) => {
      sorting.push({
        field: item.key,
        direction: item.value === 'ascend' ? 'ASC' : 'DESC',
      });
    });

    this.getPatients({ first: 10 }, sorting);
  }

  filterPatients(filter: PatientFilter) {
    for (const [key, value] of Object.entries(filter)) {
      if (value === null || value === '') {
        this.filter[key] = undefined;
        continue;
      }
      if (key === 'active') {
        this.filter[key] = { is: value };
        continue;
      }
      if (key === 'createdAt') {
        this.filter[key] = { between: { lower: value[0], upper: value[1] } };
        continue;
      }
      this.filter[key] = { iLike: `%${value}%` };
    }
    this.getPatients({ first: 10 });
  }
}
