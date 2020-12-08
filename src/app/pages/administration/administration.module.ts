import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDrawerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzSpinModule,
  NzTableModule,
  NzTabsModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { UserFormComponent } from './user-management/user-form/user-form.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsService } from './@services/permissions.service';
import { RolesService } from './@services/roles.service';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { SettingsComponent } from './settings/settings.component';
import { AppFormModule } from '../../@shared/components/form/app-form.module';

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
  ],
  declarations: [
    AdministrationComponent,
    UserManagementComponent,
    RolesAndPermissionsComponent,
    UserFormComponent,
    PermissionsComponent,
    RolesComponent,
    DepartmentsComponent,
    SettingsComponent,
  ],
  providers: [PermissionsService, RolesService],
})
export class AdministrationModule {}
