import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PatientsComponent } from './patients/patients.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzDrawerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HomeService } from './home.service';
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { CreatePatientComponent } from './patient-profile/create-patient/create-patient.component';
import { InformantsComponent } from './patient-profile/informants/informants.component';
import { ManagersComponent } from './patient-profile/managers/managers.component';
import { CliniciansComponent } from './patient-profile/clinicians/clinicians.component';

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
];

@NgModule({
  imports: [...antModules, CommonModule, TranslateModule, SharedModule, HomeRoutingModule, NzDrawerModule],
  declarations: [
    HomeComponent,
    PatientsComponent,
    CaseManagersComponent,
    PatientProfileComponent,
    CreatePatientComponent,
    InformantsComponent,
    ManagersComponent,
    CliniciansComponent,
  ],
  providers: [PatientsService, HomeService],
})
export class HomeModule {}
