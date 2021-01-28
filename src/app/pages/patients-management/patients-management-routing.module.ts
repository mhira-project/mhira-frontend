import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { PatientsManagementComponent } from './patients-management.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { InformantsListComponent } from './informants-list/informants-list.component';

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
        component: PatientsListComponent,
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
      {
        path: 'informants',
        component: InformantsListComponent,
        data: {
          title: extract('Informants'),
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
