import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientsService } from '../@services/patients.service';
import { Patient } from '../home.interfaces';
import * as moment from 'moment';
import { patientForms } from '../@forms/patient-forms';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  isLoading = false;
  loadingMessage = '';
  patientForms = patientForms;
  patient: Patient;
  hasErrors = false;
  errors: string[] = [];

  constructor(
    private patientsService: PatientsService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPatientFromUrl();
  }

  getPatientFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.patient = decryptedData;
        if (this.patient.birthDate) {
          this.patient.birthDate = decryptedData.birthDate.slice(0, 10);
        }
        this.patientForms.patient.groups.map((group) => {
          group.fields.map((field) => {
            field.value = decryptedData[field.name];
          });
        });
      }
    });
  }

  createPatient(patient: Patient) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Creating patient ${patient.firstName} ${patient.lastName}`;
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
        this.loadingMessage = '';
      },
      (error) => {
        this.hasErrors = true;
        error.graphQLErrors.map((_error: any) => {
          this.errors.push(_error.message);
        });
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  updatePatient(patient: Patient) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Updating patient ${patient.firstName} ${patient.lastName}`;
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
        this.loadingMessage = '';
        this.message.create('success', `Patient has successfully been created`);
      },
      (error) => {
        this.hasErrors = true;
        error.graphQLErrors.map((_error: any) => {
          this.errors.push(_error.message);
        });
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  submitForm(patientData: any): void {
    if (this.patient.id) {
      patientData.id = this.patient.id;
      this.updatePatient(patientData);
    } else {
      this.createPatient(patientData);
    }
  }
}
