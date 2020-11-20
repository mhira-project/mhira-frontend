import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientsService } from '../../@services/patients.service';
import { Patient } from '../../home.interfaces';
import * as moment from 'moment';
import { patientForms } from '../../@forms/patient-forms';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
  isLoading = false;
  loadingMessage = '';
  patientForms = patientForms;
  patient: Patient;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;

  constructor(
    private patientsService: PatientsService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.clearForms();
    this.getPatientFromUrl();
  }

  clearForms() {
    this.patientForms.patient.groups.map((group) => {
      group.fields.map((field) => {
        field.value = null;
      });
    });
  }

  getPatientFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        this.inputMode = false;
        this.showCancelButton = true;
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
      } else {
        this.inputMode = true;
        this.showCancelButton = false;
        this.patientForms.patient.groups.map((group) => {
          group.fields.map((field) => {
            field.value = null;
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
        const patientData = data.createPatient;
        const color = patientData.active
          ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
          : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

        const active = patientData.active ? 'active' : 'inactive';

        patientData.updatedAt = patientData.updatedAt ? moment(patientData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        patientData.birthDate = patientData.birthDate ? moment(patientData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        patientData.active = `<nz-tag class="${color}">${active}</nz-tag>`;

        this.isLoading = false;
        this.loadingMessage = '';
        this.message.create('success', `Patient has successfully been created`);
        this.router.navigate(['/mhira/home/patients']);
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
        const patientData = data.updatePatient;
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
        this.message.create('success', `Patient has successfully been updated`);
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
    if (this.patient) {
      patientData.id = this.patient.id;
      this.updatePatient(patientData);
    } else {
      this.createPatient(patientData);
    }
  }
}
