import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputSearchModule } from 'ngx-input-search';
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
import { NgZorroModule } from '@shared/ng-zorro.module';

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
  imports: [CommonModule, FormsModule, NgxInputSearchModule, ReactiveFormsModule, NgZorroModule],
  declarations: [LoaderComponent, CustomTableComponent, FormGeneratorComponent, PIPES],
  exports: [LoaderComponent, CustomTableComponent, FormGeneratorComponent, PIPES],
  providers: [XlsExportService],
})
export class SharedModule {}
