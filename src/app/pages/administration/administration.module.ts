import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { AdministrationRoutingModule } from './administration-routing.module';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';

import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsService } from './@services/permissions.service';
import { RolesService } from './@services/roles.service';
import {EmailTemplatesService} from './@services/email-templates.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ReportsComponent } from './reports/reports.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DisclaimersComponent } from './disclaimers/disclaimers.component';
import { AssessmentAdministrationComponent } from './assessment-administration/assessment-administration.component';
import { VersionComponent } from './version/version.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { CreateEmailTemplateComponent } from './create-email-template/create-email-template.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

const antModules = [
  NzGridModule,
  NzCardModule,
  NzModalModule,
  NzButtonModule,
  NzTabsModule,
  NzMessageModule,
  NzAlertModule,
  NzListModule,
  NzInputModule,
  NzIconModule,
  NzToolTipModule,
  NzModalModule,
  NzTabsModule,
  NzGridModule,
  NzDrawerModule,
  NzTableModule,
  NzCheckboxModule,
  NzSpinModule,
];

@NgModule({
  imports: [
    ...antModules,
    FormsModule,
    CommonModule,
    AppFormModule,
    TranslateModule,
    SharedModule,
    AdministrationRoutingModule,
    NzSwitchModule,
    MasterDataModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzRadioModule,
    NzFormModule,
    AngularEditorModule,
  ],
  declarations: [
    RolesAndPermissionsComponent,
    PermissionsComponent,
    RolesComponent,
    DepartmentsComponent,
    ReportsComponent,
    CreateReportComponent,
    DisclaimersComponent,
    AssessmentAdministrationComponent,
    VersionComponent,
    EmailTemplatesComponent,
    CreateEmailTemplateComponent
  ],
  providers: [PermissionsService, RolesService, EmailTemplatesService],
})
export class AdministrationModule {}
