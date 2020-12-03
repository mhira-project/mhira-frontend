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
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { CreatePatientComponent } from './patient-profile/create-patient/create-patient.component';
import { CaseManagersService } from './@services/case-managers.service';

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
];

@NgModule({
  imports: [...antModules, CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [
    HomeComponent,
    PatientsComponent,
    CaseManagersComponent,
    PatientProfileComponent,
    CreatePatientComponent,
  ],
  providers: [PatientsService, CaseManagersService],
})
export class HomeModule {}
