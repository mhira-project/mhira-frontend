import { Component, OnInit, OnChanges } from '@angular/core';
import { Patient } from '../home.interfaces';
import { table } from '../patients/patients.table';
import { PatientsService } from '@app/pages/home/@services/patients.service';
import { patientForms } from '@app/pages/home/@forms/patient-forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnChanges {
  isLoading = false;
  patients: Patient[] = [];
  patientsTable: { columns: any[]; rows: Patient[] } = {
    columns: table.columns,
    rows: [],
  };
  actions = table.actions;
  patientForms = patientForms;

  constructor(private patientsService: PatientsService, private router: Router) {}

  ngOnInit(): void {
    this.getPatients();
  }

  ngOnChanges() {}

  getPatients() {
    this.isLoading = true;
    this.patients = [];
    this.patientsService.getPatients().subscribe(
      async ({ data }) => {
        const patientsData = data['getPatients'];
        patientsData.edges.map((patient: any) => {
          const color = patient.node.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

          const active = patient.node.active ? 'active' : 'inactive';

          patient.node.updatedAt = patient.node.updatedAt
            ? moment(patient.node.updatedAt).format('DD-MM-YYYY HH:mm')
            : '';
          patient.node.birthDate = patient.node.birthDate
            ? moment(patient.node.birthDate).format('DD-MM-YYYY HH:mm')
            : '';
          patient.node.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          this.patients.push(patient.node);
        });
        this.patientsTable.rows = this.patients;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  deletePatient(patient: Patient) {
    this.isLoading = true;
    this.patientsService.deletePatient(patient).subscribe(
      async ({ data }) => {
        const deletedIndex = this.patients.findIndex((_patient) => _patient.id === patient.id);
        this.patients.splice(deletedIndex, 1);
        this.patientsTable.rows = this.patients;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  handleCreatePatient(): void {
    this.router.navigate(['/mhira/home/profile']);
  }

  onActionSelect(action: any) {}
}
