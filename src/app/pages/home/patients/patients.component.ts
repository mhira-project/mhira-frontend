import { Component, OnInit, OnChanges } from '@angular/core';
import { Patient } from '../@types/patient';
import { table } from '../@tables/patients.table';
import { PatientsService } from '@app/pages/home/@services/patients.service';
import { patientForms } from '@app/pages/home/@forms/patient-forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Paging } from '@shared/@types/paging';
import { Form } from '@shared/components/field-generator/form';
import { DateService } from '@shared/services/date.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnChanges {
  isLoading = false;
  isVisible = false;
  isOkLoading = false;
  patients: any[] = [];
  filter: any = {};
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  showFilterPanel = false;
  filterForm: Form = patientForms.patientFilter;
  patientsTable: { columns: any[]; rows: Patient[] } = {
    columns: table.columns,
    rows: [],
  };
  actions = table.actions;
  currentPatientIndex: number;

  constructor(
    private patientsService: PatientsService,
    private dateService: DateService,
    private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    this.getPatients(this.paging);
  }

  loadPermissions() {
    if (!this.perms.permissionsOnly('manage patients')) {
      this.actions.splice(1, 1);
    }
  }

  ngOnChanges() {}

  getPatients(paging: Paging) {
    this.isLoading = true;
    this.patients = [];
    const _patients: any[] = [];
    this.patientsService.getPatients({ filter: this.filter, paging }).subscribe(
      async ({ data }) => {
        const patientsData = data.patients;
        patientsData.edges.map((patient: any) => {
          const row = Object.assign({}, patient.node);
          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'ACTIVE' : 'ARCHIVED';
          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          row.updatedAt = row.updatedAt ? this.dateService.formatDate(row.updatedAt) : '';
          row.birthDate = row.birthDate ? this.dateService.formatDate(row.birthDate) : '';
          _patients.push(row);
          this.patients.push(patient.node);
        });

        this.patientsTable.rows = _patients;
        this.paging.after = data.patients.pageInfo.endCursor;
        this.paging.before = data.patients.pageInfo.startCursor;
        this.pageInfo = data.patients.pageInfo;
        this.isLoading = false;
      },
      (error) => {
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
    this.getPatients(this.paging);
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
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCreatePatient(): void {
    this.router.navigate(['/mhira/home/profile']);
  }

  handleActionClick(event: any): void {
    switch (event.action.name) {
      case 'Delete Patient':
        this.isVisible = true;
        this.currentPatientIndex = event.index;
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

  filterEvent(data: any) {
    this.filter = data;
    this.getPatients({ first: 10 });
  }

  closeFilterPanel() {
    this.showFilterPanel = false;
  }

  showFilterPanelAction() {
    this.showFilterPanel = true;
  }
}
