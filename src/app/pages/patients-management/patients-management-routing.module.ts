import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { InformantsListComponent } from './informants-list/informants-list.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('Case Management'),
    },
    children: [
      {
        path: 'patients',
        component: PatientsListComponent,
        data: {
          title: extract('Patients'),
          breadcrumb: extract('Patients'),
          permissions: {
            only: [PermissionKey.VIEW_PATIENTS],
          },
          canActivate: [PermissionGuard],
        },
      },
      {
        path: 'profile',
        component: PatientProfileComponent,
        data: {
          title: extract('Patient Profile'),
          breadcrumb: extract('Patient Profile'),
          permissions: {
            only: [PermissionKey.VIEW_PATIENTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'case-managers',
        component: CaseManagersComponent,
        data: {
          title: extract('Case Managers'),
          breadcrumb: extract('Case Managers'),
          permissions: {
            only: [PermissionKey.MANAGE_PATIENTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'informants',
        component: InformantsListComponent,
        data: {
          title: extract('Informants'),
          breadcrumb: extract('Informants'),
          permissions: {
            only: [PermissionKey.MANAGE_PATIENTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'patients',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsManagementRoutingModule {}
