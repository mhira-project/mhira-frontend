import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../../i18n';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { PatientStatusesComponent } from './patient-statuses/patient-statuses.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../../permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('Administration'),
    },
    children: [
      {
        path: 'system-configuration',
        component: SystemConfigurationComponent,
        data: {
          title: extract('System Configuration'),
          breadcrumbI18nKey: 'menu.systemConfiguration',
          breadcrumb: extract('System Configuration'),
          permissions: {
            only: [PermissionKey.VIEW_SYSCONF],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'patient-statuses',
        component: PatientStatusesComponent,
        data: {
          title: extract('Patient Statuses'),
          breadcrumbI18nKey: 'menu.patientStatuses',
          breadcrumb: extract('Patient Statuses'),
          permissions: {
            only: [PermissionKey.VIEW_SETTINGS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'system-configuration',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
