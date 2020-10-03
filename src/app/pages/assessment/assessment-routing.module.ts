import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { AssessmentComponent } from './assessment.component';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';
import { DoAssessmentComponent } from './do-assessment/do-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    data: {
      title: extract('Assessments'),
    },
    children: [
      {
        path: '',
        component: AssessmentsListComponent,
        data: {
          title: extract('Planned Assessments'),
        },
      },
      {
        path: 'plan-assessments',
        component: PlanAssessmentComponent,
        data: {
          title: extract('Plan Assessments'),
        },
      },
      {
        path: 'do-assessments',
        component: DoAssessmentComponent,
        data: {
          title: extract('Assessment'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentRoutingModule {}
