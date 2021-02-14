import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataListComponent } from './master-data-list/master-data-list.component';
import { MasterDataSearchComponent } from './master-data-search/master-data-search.component';
import { NgxInputSearchModule } from 'ngx-input-search';
import {
  NzAvatarModule,
  NzDropDownModule,
  NzIconModule,
  NzInputModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { MasterDataTableComponent } from './master-data-table/master-data-table.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [MasterDataListComponent, MasterDataSearchComponent, MasterDataTableComponent],
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
  ],
  exports: [MasterDataListComponent, MasterDataSearchComponent, MasterDataTableComponent],
})
export class MasterDataModule {}
