import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { PatientsManagementRoutingModule } from './patients-management-routing.module';
import { PatientsManagementComponent } from './patients-management.component';
import { PatientsComponent } from './patients/patients.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import {
  NzAlertModule,
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzDrawerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzTabsModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { CreatePatientComponent } from './patient-profile/create-patient/create-patient.component';
import { CaseManagersService } from './@services/case-managers.service';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { EmergencyContactsService } from './@services/contacts.service';

const antModules = [
  NzGridModule,
  NzCardModule,
  NzTagModule,
  NzModalModule,
  NzButtonModule,
  NzTabsModule,
  NzMessageModule,
  NzAlertModule,
  NzListModule,
  NzInputModule,
  NzIconModule,
  NzDrawerModule,
  NzAvatarModule,
];

@NgModule({
  imports: [...antModules, CommonModule, AppFormModule, TranslateModule, SharedModule, PatientsManagementRoutingModule],
  declarations: [
    PatientsManagementComponent,
    PatientsComponent,
    CaseManagersComponent,
    PatientProfileComponent,
    CreatePatientComponent,
  ],
  providers: [PatientsService, CaseManagersService, EmergencyContactsService],
})
export class PatientsManagementModule {}
