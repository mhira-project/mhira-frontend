import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('Assessments'),
    },
    children: [
      {
        path: 'planned-assessments',
        component: AssessmentsListComponent,
        data: {
          title: extract('Planned Assessments'),
          breadcrumb: extract('Planned Assessments'),
        },
      },
      {
        path: 'plan-assessments',
        component: PlanAssessmentComponent,
        data: {
          title: extract('Plan Assessments'),
          breadcrumb: extract('Plan Assessments'),
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'planned-assessments',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentRoutingModule {}
