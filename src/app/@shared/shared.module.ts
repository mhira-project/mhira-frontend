import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XlsExportService } from '@shared/services/xls-export.service';
import { LoaderComponent } from '@shared';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';
import { FormGeneratorComponent } from '@shared/components/form-generator/form-generator.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, CustomTableComponent, FormGeneratorComponent],
  exports: [LoaderComponent, CustomTableComponent, FormGeneratorComponent],
  providers: [XlsExportService],
})
export class SharedModule {}
