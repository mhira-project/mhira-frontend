import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzAlertModule, NzButtonModule, NzFormModule, NzInputModule, NzLayoutModule } from 'ng-zorro-antd';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionComponent } from './question/question.component';

const antModules = [NzFormModule, NzAlertModule, NzLayoutModule, NzInputModule, NzButtonModule];

@NgModule({
  imports: [...antModules, CommonModule, ReactiveFormsModule, TranslateModule, QuestionnaireRoutingModule],
  declarations: [QuestionnairesListComponent, QuestionComponent],
})
export class QuestionnaireModule {}
