import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
import { AssessmentResolver } from './assessment.resolver';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { AssessmentFormComponent } from './assessment-form.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentFormComponent,
    resolve: { assessment: AssessmentResolver },
    children: [
      {
        path: 'overview',
        component: AssessmentOverviewComponent,
      },
      {
        path: 'questionnaire/:questionnaireIndex',
        component: QuestionnaireFormComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentFormRoutingModule {}
