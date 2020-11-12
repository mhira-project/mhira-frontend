import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputSearchModule } from 'ngx-input-search';
import { XlsExportService } from '@shared/services/xls-export.service';
import { ComponentsModule } from '@shared/components/components.module';
import { DateService } from '@shared/services/date.service';

@NgModule({
  imports: [CommonModule, FormsModule, NgxInputSearchModule, ReactiveFormsModule, ComponentsModule],
  declarations: [],
  exports: [ComponentsModule],
  providers: [XlsExportService, DateService],
})
export class SharedModule {}
