import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    data: {
      breadcrumbI18nKey: 'menu.dashboard',
    },
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'case-management',
    data: {
      breadcrumbI18nKey: 'menu.caseManagement',
    },
    loadChildren: () =>
      import('./patients-management/patients-management.module').then((m) => m.PatientsManagementModule),
  },
  {
    path: 'questionnaire-management',
    data: {
      breadcrumbI18nKey: 'menu.questionnaires',
    },
    loadChildren: () =>
      import('./questionnaire-management/questionnaire-management.module').then((m) => m.QuestionnaireManagementModule),
  },
  {
    path: 'assessments',
    data: {
      breadcrumbI18nKey: 'menu.assessments',
    },
    loadChildren: () => import('./assessment/assessment.module').then((m) => m.AssessmentModule),
  },
  {
    path: 'user-management',
    data: {},
    loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
  },
  {
    path: 'administration',
    data: {
      breadcrumbI18nKey: 'menu.administration',
    },
    loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
  },
  {
    path: 'feedback',
    data: {
      breadcrumbI18nKey: 'menu.feedback',
    },
    loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
  {
    path: 'miscellaneous',
    loadChildren: () => import('./miscellaneous/miscellaneous.module').then((m) => m.MiscellaneousModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'miscellaneous/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
