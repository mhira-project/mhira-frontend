import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputSearchModule } from 'ngx-input-search';
import { NgZorroModule } from '@shared/ng-zorro.module';
import { XlsExportService } from '@shared/services/xls-export.service';
import { FieldGeneratorComponent } from './field-generator/field-generator.component';
import { LoaderComponent } from './loader/loader.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
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
} from '../pipes';

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
  declarations: [PIPES, LoaderComponent, CustomTableComponent, FormGeneratorComponent, FieldGeneratorComponent],
  exports: [PIPES, LoaderComponent, CustomTableComponent, FormGeneratorComponent, FieldGeneratorComponent],
  providers: [XlsExportService],
})
export class ComponentsModule {}
