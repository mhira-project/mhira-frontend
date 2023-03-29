import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { InformantsListComponent } from './informants-list/informants-list.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';
import { CaregiverListComponent } from './caregiver-list/caregiver-list.component';
import { CreateReportComponent } from '../administration/create-report/create-report.component';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patients',
        component: PatientsListComponent,
        data: {
          breadcrumbI18nKey: 'menu.patientList',
          permissions: {
            only: [PermissionKey.VIEW_PATIENTS],
          },
          canActivate: [PermissionGuard],
        },
      },
      {
        path: 'create-assessment',
        component: CreateAssessmentComponent,
        data: {
          breadcrumbI18nKey: 'menu.createAssessment',
        },
      },
      {
        path: 'profile',
        component: PatientProfileComponent,
        data: {
          breadcrumbI18nKey: 'menu.createPatient',
          permissions: {
            only: [PermissionKey.VIEW_PATIENTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'caregiver-list',
        component: CaregiverListComponent,
        data: {
          breadcrumbI18nKey: 'menu.caregiverList',
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
          breadcrumbI18nKey: 'menu.caseManagers',
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
          breadcrumbI18nKey: 'menu.informants',
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
