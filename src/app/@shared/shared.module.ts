import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputSearchModule } from 'ngx-input-search';
import { NgZorroAntdModule, NzDividerModule, NzTableModule, NzIconModule, NzAlertModule } from 'ng-zorro-antd';
import { XlsExportService } from '@shared/services/xls-export.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';
import { FormGeneratorComponent } from '@shared/components/form-generator/form-generator.component';
import {
  CapitalizePipe,
  DynamicPipe,
  IconFilterPipe,
  NoSanitizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  SearchPipe,
  TimingPipe,
} from './pipes';

const PIPES = [
  CapitalizePipe,
  DynamicPipe,
  IconFilterPipe,
  NoSanitizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  SearchPipe,
  TimingPipe,
];

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NgZorroAntdModule,
    NzIconModule,
    NzAlertModule,
    FormsModule,
    NgxInputSearchModule,
    ReactiveFormsModule,
  ],
  declarations: [LoaderComponent, CustomTableComponent, FormGeneratorComponent, PIPES],
  exports: [LoaderComponent, CustomTableComponent, FormGeneratorComponent, PIPES],
  providers: [XlsExportService],
})
export class SharedModule {}
