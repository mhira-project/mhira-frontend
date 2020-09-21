import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../@services/patients.service';
import { Patient } from '../home.interfaces';
import * as moment from 'moment';
import { patientForms } from '../@forms/patient-forms';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  isLoading = false;
  patientForms = patientForms;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {}

  createPatient(patient: Patient) {
    this.isLoading = true;
    this.patientsService.createPatient(patient).subscribe(
      async ({ data }) => {
        const patientData = data['createPatient'];
        const color = patientData.active
          ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
          : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

        const active = patientData.active ? 'active' : 'inactive';

        patientData.updatedAt = patientData.updatedAt ? moment(patientData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        patientData.birthDate = patientData.birthDate ? moment(patientData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        patientData.active = `<nz-tag class="${color}">${active}</nz-tag>`;

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  updatePatient(patient: Patient) {
    this.isLoading = true;
    this.patientsService.updatePatient(patient).subscribe(
      async ({ data }) => {
        const patientData = data['updatePatient'];
        const color = patientData.active
          ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
          : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

        const active = patientData.active ? 'active' : 'inactive';

        patientData.updatedAt = patientData.updatedAt ? moment(patientData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        patientData.birthDate = patientData.birthDate ? moment(patientData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        patientData.active = `<nz-tag class="${color}">${active}</nz-tag>`;

        // const updatedIndex = this.patients.findIndex((_patient) => _patient.id === patient.id);

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  handleInputChange(field: any): void {
    console.log(field);
  }
}
