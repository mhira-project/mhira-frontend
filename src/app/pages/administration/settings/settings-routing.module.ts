import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../../i18n';
import { SettingsComponent } from './settings.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { PatientStatusesComponent } from './patient-statuses/patient-statuses.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: extract('Administration'),
    },
    children: [
      {
        path: 'system-configuration',
        component: SystemConfigurationComponent,
        data: {
          title: extract('System Configuration'),
        },
      },
      {
        path: 'patient-statuses',
        component: PatientStatusesComponent,
        data: {
          title: extract('Patient Statuses'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
