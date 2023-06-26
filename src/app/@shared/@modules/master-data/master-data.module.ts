import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataListComponent } from './master-data-list/master-data-list.component';
import { MasterDataSearchComponent } from './master-data-search/master-data-search.component';
import { NgxInputSearchModule } from 'ngx-input-search';
import { MasterDataTableComponent } from './master-data-table/master-data-table.component';
import { SharedModule } from '@shared';
import { MasterDataFilterFormComponent } from './master-data-filter-form/master-data-filter-form.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    NzToolTipModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [MasterDataListComponent, MasterDataSearchComponent],
})
export class MasterDataModule {}
