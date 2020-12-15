import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { PatientsManagementComponent } from './patients-management.component';
import { PatientsComponent } from './patients/patients.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsManagementComponent,
    data: {
      title: extract('Home'),
    },
    children: [
      {
        path: 'patients',
        component: PatientsComponent,
        data: {
          title: extract('Patients'),
        },
      },
      {
        path: 'profile',
        component: PatientProfileComponent,
        data: {
          title: extract('Patient Profile'),
        },
      },
      {
        path: 'case-managers',
        component: CaseManagersComponent,
        data: {
          title: extract('Case Managers'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsManagementRoutingModule {}
