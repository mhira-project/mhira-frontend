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
  NzButtonModule,
  NzCardModule,
  NzGridModule,
  NzModalModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HomeService } from './home.service';
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';

const antModules = [NzGridModule, NzCardModule, NzTagModule, NzModalModule, NzButtonModule, NzTabsModule];

@NgModule({
  imports: [...antModules, CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [HomeComponent, PatientsComponent, CaseManagersComponent, PatientProfileComponent],
  providers: [PatientsService, HomeService],
})
export class HomeModule {}
