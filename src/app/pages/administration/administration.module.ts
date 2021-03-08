import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { AdministrationRoutingModule } from './administration-routing.module';
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
  NzSwitchModule,
  NzTableModule,
  NzTabsModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsService } from './@services/permissions.service';
import { RolesService } from './@services/roles.service';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';

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
  ],
  declarations: [RolesAndPermissionsComponent, PermissionsComponent, RolesComponent, DepartmentsComponent],
  providers: [PermissionsService, RolesService],
})
export class AdministrationModule {}
