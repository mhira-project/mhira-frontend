import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputSearchModule } from 'ngx-input-search';
import { XlsExportService } from '@shared/services/xls-export.service';
import { LoaderComponent } from './loader/loader.component';
import { TableComponent } from './table/table.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {
  CapitalizePipe,
  DatePipe,
  IconFilterPipe,
  NoSanitizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  SearchPipe,
  TimingPipe,
} from '../pipes';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import { AppFormModule } from '@shared/components/form/app-form.module';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { CountryPipe } from '../pipes/country.pipe';
import { UserPickerComponent } from './user-picker/user-picker.component';
import { PatientPickerComponent } from './patient-picker/patient-picker.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { TranslateModule } from '@ngx-translate/core';
import { CaregiverPickerComponent } from './caregiver-picker/caregiver-picker.component';

const antModules = [
  NzSkeletonModule,
  NzSliderModule,
  NzStatisticModule,
  NzStepsModule,
  NzSwitchModule,
  NzTableModule,
  NzTimePickerModule,
  NzTimelineModule,
  NzMentionModule,
  NzPageHeaderModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzProgressModule,
  NzRadioModule,
  NzRateModule,
  NzResultModule,
  NzSelectModule,
  NzCarouselModule,
  NzCascaderModule,
  NzCheckboxModule,
  NzCollapseModule,
  NzCommentModule,
  NzDatePickerModule,
  NzDescriptionsModule,
  NzDividerModule,
  NzDrawerModule,
  NzInputNumberModule,
  NzAffixModule,
  NzAlertModule,
  NzAnchorModule,
  NzAutocompleteModule,
  NzAvatarModule,
  NzBackTopModule,
  NzBadgeModule,
  NzButtonModule,
  NzBreadCrumbModule,
  NzCalendarModule,
  NzCardModule,
  NzDropDownModule,
  NzEmptyModule,
  NzFormModule,
  NzGridModule,
  NzI18nModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzListModule,
  NzMenuModule,
  NzMessageModule,
  NzModalModule,
  NzNoAnimationModule,
  NzNotificationModule,
  NzSpinModule,
  NzTabsModule,
  NzTagModule,
  NzToolTipModule,
  NzTransferModule,
  NzTreeModule,
  NzTreeSelectModule,
  NzTypographyModule,
  NzUploadModule,
  NzWaveModule,
  NzTransButtonModule,
];

const PIPES = [
  CapitalizePipe,
  IconFilterPipe,
  NoSanitizePipe,
  NumberWithCommasPipe,
  PluralPipe,
  RoundPipe,
  SearchPipe,
  TimingPipe,
  DatePipe,
  CountryPipe,
];

@NgModule({
  imports: [
    ...antModules,
    CommonModule,
    FormsModule,
    AppFormModule,
    NgxInputSearchModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    ...PIPES,
    LoaderComponent,
    TableComponent,
    FormGeneratorComponent,
    CustomFilterComponent,
    SelectModalComponent,
    UserPickerComponent,
    PatientPickerComponent,
    BreadcrumbComponent,
    CaregiverPickerComponent,
  ],
  exports: [
    ...PIPES,
    LoaderComponent,
    TableComponent,
    FormGeneratorComponent,
    CustomFilterComponent,
    AppFormModule,
    UserPickerComponent,
    PatientPickerComponent,
    BreadcrumbComponent,
    CaregiverPickerComponent,
  ],
  providers: [XlsExportService],
})
export class ComponentsModule {}
