import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  patient: Patient;
  filter: CaseManagerFilter;

  get patientTitle(): string {
    const name = [this.patient?.firstName, this.patient?.middleName, this.patient?.lastName]
      .filter((s) => !!s)
      .join(' ');
    return [this.patient?.medicalRecordNo, name].filter((s) => !!s).join(' - ');
  }

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        this.patient = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.filter = {
          patientId: this.patient.id,
        };
      }
    });
  }
}
