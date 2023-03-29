import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { PatientsManagementRoutingModule } from './patients-management-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';
import { PatientsService } from './@services/patients.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { CreatePatientComponent } from './patient-profile/create-patient/create-patient.component';
import { CaseManagersService } from './@services/case-managers.service';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { EmergencyContactsService } from './@services/contacts.service';
import { InformantsListComponent } from './informants-list/informants-list.component';
import { PatientStatusesService } from './@services/patient-statuses.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsService } from './@services/departments.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CaregiverListComponent } from './caregiver-list/caregiver-list.component';
import { CaregiversPatientComponent } from './caregivers-patient/caregivers-patient.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReportsComponent } from './reports/reports.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AssessmentModule } from '../assessment/assessment.module';
import { QRCodeModule } from 'angularx-qrcode';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CustomDirectivesModule } from '@app/@shared/directives/custom-directives.module';

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
  NzToolTipModule,
  NzCheckboxModule
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
    NzFormModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NzRadioModule,
    NzDatePickerModule,
    AssessmentModule,
    QRCodeModule,
    CustomDirectivesModule
  ],
  declarations: [
    PatientsListComponent,
    CaseManagersComponent,
    InformantsListComponent,
    PatientProfileComponent,
    CreatePatientComponent,
    DepartmentsComponent,
    CaregiverListComponent,
    CaregiversPatientComponent,
    ReportsComponent,
    AssessmentsComponent,
    CreateAssessmentComponent,
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
