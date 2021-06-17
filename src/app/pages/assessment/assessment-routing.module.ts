import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'planned-assessments',
        component: AssessmentsListComponent,
        data: {
          breadcrumbI18nKey: 'menu.plannedAssessments',
          permissions: {
            only: [PermissionKey.VIEW_ASSESSMENTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'plan-assessments',
        component: PlanAssessmentComponent,
        data: {
          breadcrumbI18nKey: 'menu.planAssessment',
          permissions: {
            only: [PermissionKey.VIEW_ASSESSMENTS, PermissionKey.MANAGE_ASSESSMENTS],
          },
        },
        canActivate: [PermissionGuard],
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
