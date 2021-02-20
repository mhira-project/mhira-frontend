import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientsService } from '../../@services/patients.service';
import { Patient } from '../../@types/patient';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientForm } from '@app/pages/patients-management/@forms/patient-form';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { EmergencyContactsService } from '@app/pages/patients-management/@services/contacts.service';
import { Contact } from '@app/pages/patients-management/@types/contact';
import { PermissionKey } from '@app/@shared/@types/permission';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  populateForm = false;
  resetForm = false;
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
    console.log(this.patient);
    this.getPatientFromUrl();
  }

  getPatientFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.resetForm = false;
      this.populateForm = false;
      if (params.profile) {
        this.inputMode = false;
        this.showCancelButton = true;
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.patient = decryptedData;
        if (this.patient.birthDate) {
          this.patient.birthDate = decryptedData.birthDate.slice(0, 10);
        }
        this.populateForm = true;
      } else {
        this.inputMode = true;
        this.showCancelButton = false;
        this.resetForm = true;
      }
    });
  }

  createEmergencyContacts(patientId: number, contacts: Contact[]) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    contacts.map((contact: Contact) => {
      contact.patientId = patientId;
    });
    this.emergencyContactsService.createManyEmergencyContacts(contacts).subscribe(
      async ({ data }: any) => {
        this.isLoading = false;
        this.loadingMessage = '';
        this.populateForm = false;
        this.resetForm = true;
        this.message.create('success', `Patient has successfully been created`);
        this.router.navigate(['/mhira/case-management/patients']);
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
    this.resetForm = false;
    this.populateForm = false;
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
