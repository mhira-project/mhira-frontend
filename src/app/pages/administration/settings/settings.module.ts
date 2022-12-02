import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FormsModule } from '@angular/forms';
import { AppFormModule } from '../../../@shared/components/form/app-form.module';
import { PatientStatusesComponent } from '../patient-statuses/patient-statuses.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { PatientStatusesService } from '../../patients-management/@services/patient-statuses.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

const antModules = [NzAlertModule, NzDrawerModule];

@NgModule({
  imports: [
    ...antModules,
    FormsModule,
    CommonModule,
    AppFormModule,
    TranslateModule,
    SharedModule,
    SettingsRoutingModule,
  ],
  declarations: [PatientStatusesComponent, SystemConfigurationComponent],
  providers: [PatientStatusesService],
})
export class SettingsModule {}
