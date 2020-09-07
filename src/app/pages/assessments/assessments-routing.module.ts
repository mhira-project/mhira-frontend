import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { AssessmentsComponent } from './assessments.component';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { PlannedAssessmentComponent } from './planned-assessment/planned-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentsComponent,
    data: {
      title: extract('Assessments'),
    },
    children: [
      {
        path: 'plan-assessments',
        component: PlanAssessmentComponent,
        data: {
          title: extract('Plan Assessments'),
        },
      },
      {
        path: 'planned-assessments',
        component: PlannedAssessmentComponent,
        data: {
          title: extract('Planned Assessments'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentsRoutingModule {}
