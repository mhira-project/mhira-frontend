import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { PatientsManagementRoutingModule } from './patients-management-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
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
  NzSelectModule,
  NzTabsModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { CreatePatientComponent } from './patient-profile/create-patient/create-patient.component';
import { CaseManagersService } from './@services/case-managers.service';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { EmergencyContactsService } from './@services/contacts.service';
import { InformantsListComponent } from './informants-list/informants-list.component';
import { PatientStatusesService } from './@services/patient-statuses.service';
import { FormsModule } from '@angular/forms';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsService } from './@services/departments.service';

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
  NzSelectModule,
];

@NgModule({
  imports: [
    ...antModules,
    FormsModule,
    CommonModule,
    AppFormModule,
    TranslateModule,
    SharedModule,
    PatientsManagementRoutingModule,
    MasterDataModule,
  ],
  declarations: [
    PatientsListComponent,
    CaseManagersComponent,
    InformantsListComponent,
    PatientProfileComponent,
    CreatePatientComponent,
    DepartmentsComponent,
  ],
  providers: [
    PatientsService,
    CaseManagersService,
    EmergencyContactsService,
    DepartmentsService,
    PatientStatusesService,
  ],
})
export class PatientsManagementModule {}
