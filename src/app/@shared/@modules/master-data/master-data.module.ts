import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataListComponent } from './master-data-list/master-data-list.component';
import { MasterDataSearchComponent } from './master-data-search/master-data-search.component';
import { NgxInputSearchModule } from 'ngx-input-search';
import {
  NzAvatarModule,
  NzButtonModule,
  NzDropDownModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { MasterDataTableComponent } from './master-data-table/master-data-table.component';
import { SharedModule } from '@shared';
import { NzDrawerModule } from 'ng-zorro-antd';
import { MasterDataFilterFormComponent } from './master-data-filter-form/master-data-filter-form.component';

@NgModule({
  declarations: [
    MasterDataListComponent,
    MasterDataSearchComponent,
    MasterDataTableComponent,
    MasterDataFilterFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxInputSearchModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzAvatarModule,
    NzDropDownModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
  ],
  exports: [MasterDataListComponent, MasterDataSearchComponent],
})
export class MasterDataModule {}
