import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  patient: FormattedPatient;
  filter: CaseManagerFilter;

  get patientTitle(): string {
    const name = [this.patient?.firstName, this.patient?.middleName, this.patient?.lastName]
      .filter((s) => !!s)
      .join(' ');
    return [this.patient?.medicalRecordNo, name].filter((s) => !!s).join(' - ');
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        const patient = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // this.patient = PatientModel.fromJson(patient);
        this.patient = patient;
        this.filter = {
          patientId: this.patient.id,
        };
      }
    });
  }

  goBack() {
    this.router.navigate(['/mhira/case-management/patients']);
  }

  getToken() {
    const userStr = localStorage.getItem('auth_app_token');
    const user = JSON.parse(userStr);
    return user.accessToken;
  }
}
