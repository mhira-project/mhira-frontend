import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientsService } from '../../@services/patients.service';
import { Patient } from '../../@types/patient';
import * as moment from 'moment';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientForm } from '@app/pages/patients-management/@forms/patient-form';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { EmergencyContactsService } from '@app/pages/patients-management/@services/contacts.service';
import { Contact } from '@app/pages/patients-management/@types/contact';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
  isLoading = false;
  loadingMessage = '';
  patientForm = PatientForm;
  patient: Patient;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;

  constructor(
    private patientsService: PatientsService,
    private emergencyContactsService: EmergencyContactsService,
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
    this.patientForm.groups.map((group) => {
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
        this.patientForm.groups.map((group) => {
          group.fields.map((field) => {
            field.value = decryptedData[field.name];
          });
        });
      } else {
        this.inputMode = true;
        this.showCancelButton = false;
        this.patientForm.groups.map((group) => {
          group.fields.map((field) => {
            field.value = null;
          });
        });
      }
    });
  }

  createEmergencyContacts(patientId: number, contacts: Contact[]) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.emergencyContactsService.createManyEmergencyContacts(contacts).subscribe(
      async ({ data }: any) => {
        const ids = data.createManyEmergencyContacts.edges.filter((contact: any) => {
          return contact.id;
        });
        this.addEmergencyContactsToPatients(patientId, ids);
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

  addEmergencyContactsToPatients(patientId: number, emergencyContactsIds: number[]) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.emergencyContactsService.addEmergencyContactsToPatient(patientId, emergencyContactsIds).subscribe(
      async ({ data }: any) => {
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

  createPatient(patient: Patient) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    const emergencyContacts = patient.emergencyContacts;
    patient.emergencyContacts = undefined;
    this.loadingMessage = `Creating patient ${patient.firstName} ${patient.lastName}`;
    this.patientsService.createPatient(patient).subscribe(
      async ({ data }: any) => {
        const patientData = data.createOnePatient;
        patient.emergencyContacts = emergencyContacts;
        this.isLoading = false;
        this.loadingMessage = '';
        this.createEmergencyContacts(patientData.id, emergencyContacts);
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
    const emergencyContacts = patient.emergencyContacts;
    patient.emergencyContacts = undefined;
    this.patientsService.updatePatient(patient).subscribe(
      async ({ data }) => {
        const patientData = data.updateOnePatient;
        PatientModel.fromJson(patientData);
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
