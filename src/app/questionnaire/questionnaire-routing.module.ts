import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { DoAssessmentComponent } from './do-assessment/do-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnairesListComponent,
  },
  {
    path: 'questionnaire',
    component: DoAssessmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class QuestionnaireRoutingModule {}
