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
      permissions: {
        only: [PermissionKey.VIEW_SETTINGS],
      },
    },
    canActivate: [PermissionGuard],
    children: [
      {
        path: 'system-configuration',
        component: SystemConfigurationComponent,
        data: {
          title: extract('System Configuration'),
          breadcrumb: extract('System Configuration'),
        },
      },
      {
        path: 'patient-statuses',
        component: PatientStatusesComponent,
        data: {
          title: extract('Patient Statuses'),
          breadcrumb: extract('Patient Statuses'),
        },
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
