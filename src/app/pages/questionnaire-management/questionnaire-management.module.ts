import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { QuestionnaireManagementRoutingModule } from './questionnaire-management-routing.module';
import { FormsModule } from '@angular/forms';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [QuestionnaireFormComponent, QuestionnaireListComponent],
  imports: [
    CommonModule,
    QuestionnaireManagementRoutingModule,
    FormsModule,
    MasterDataModule,
    NzButtonModule,
    NzIconModule,
    AppFormModule,
    NzTabsModule,
  ],
})
export class QuestionnaireManagementModule {}
