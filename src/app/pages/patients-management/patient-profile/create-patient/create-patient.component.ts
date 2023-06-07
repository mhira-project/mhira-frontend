import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PatientsService } from '../../@services/patients.service';
import { Patient } from '../../@types/patient';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PatientCreateForm, PatientUpdateForm } from '@app/pages/patients-management/@forms/patient-form';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { EmergencyContactsService } from '@app/pages/patients-management/@services/contacts.service';
import { Contact } from '@app/pages/patients-management/@types/contact';
import { PermissionKey } from '@app/@shared/@types/permission';
import { ErrorHandlerService } from '../../../../@shared/services/error-handler.service';
import { finalize } from 'rxjs/operators';
import { DepartmentsService } from '../../@services/departments.service';

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
  patientForm = PatientCreateForm;
  patientUpdateForm = PatientUpdateForm;
  patient: Patient;
  inputMode = true;
  showCancelButton = false;

  constructor(
    private patientsService: PatientsService,
    private emergencyContactsService: EmergencyContactsService,
    private message: NzMessageService,
    private errorService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getPatientFromUrl();
    this.getDepartments();
  }

  public submitForm(patientData: Patient): void {
    if (this.patient) {
      patientData.id = this.patient.id;
      this.updatePatient(patientData);
    } else {
      this.createPatient(patientData);
    }
  }

  private getPatientFromUrl(): void {
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

  private createEmergencyContacts(patientId: number, contacts: Contact[]) {
    this.isLoading = true;
    contacts.map((contact: Contact) => {
      contact.patientId = patientId;
    });
    this.emergencyContactsService
      .createManyEmergencyContacts(contacts)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        () => {
          this.populateForm = false;
          this.resetForm = true;
          this.message.success('Emergency contacts have successfully been created');
          this.router.navigate(['/mhira/case-management/patients']);
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create emergency contacts',
          })
      );
  }

  private createPatient(patient: Patient) {
    this.isLoading = true;
    this.resetForm = false;
    this.populateForm = false;
    const emergencyContacts = patient.emergencyContacts;
    patient.emergencyContacts = undefined;
    this.loadingMessage = `Creating patient ${patient.firstName} ${patient.lastName}`;
    this.patientsService
      .createPatient(patient)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        async ({ data }: any) => {
          const patientData = data.createOnePatient;
          this.router.navigate(['/mhira/case-management/patients']);
          this.message.success('Patient has successfully been created');
          patient.emergencyContacts = emergencyContacts;
          this.createEmergencyContacts(patientData.id, emergencyContacts);
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create patient',
          })
      );
  }

  private updatePatient(patient: Patient) {
    this.isLoading = true;
    this.loadingMessage = `Updating patient ${patient.firstName} ${patient.lastName}`;
    patient.emergencyContacts = undefined;
    this.patientsService
      .updatePatient(patient)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        async ({ data }) => {
          const patientData = data.updateOnePatient;
          PatientModel.fromJson(patientData);
          this.message.create('success', `Patient has successfully been updated`);
          this.router.navigate(['/mhira/case-management/patients']);
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: `Unable to update patient "${patient.firstName} ${patient.lastName}"`,
          })
      );
  }

  private getDepartments(): void {
    const filter = {
      users: {
        id: {
          eq: JSON.parse(localStorage.getItem('user')).id,
        },
      },
    };
    this.departmentsService.departments({ paging:{first: 50}, filter }).subscribe((response) => {
      this.patientForm.groups[0].fields[6].options = response.data.departments.edges.map((e: any) => ({
        label: e.node.name,
        value: e.node.id,
      }));
    });
  }
}
