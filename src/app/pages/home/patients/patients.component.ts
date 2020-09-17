import { Component, OnInit, OnChanges } from '@angular/core';
import { Patient } from '../home.interfaces';
import { table } from '../patients/patients.table';
import { PatientsService } from '@app/pages/home/patients/patients.service';
import { patientForms } from '@app/pages/home/patients/patient-forms';

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

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  ngOnChanges() {
    console.log(patientForms.searchForm);
  }

  getPatients() {
    this.isLoading = true;
    this.patientsService.getPatients().subscribe(
      async ({ data }) => {
        const pageData = data['getPatients'];
        this.patients = pageData.edges;
        this.patientsTable.rows = this.patients;
        /*this.patients.map(patient => {
          return {
            id: patient.id
          }
        });*/
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onActionSelect(action: any) {}
}
