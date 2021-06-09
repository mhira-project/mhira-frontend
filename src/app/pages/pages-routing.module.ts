import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'dashboard',
    data: {
      breadcrumb: extract('Dashboard'),
      breadcrumbI18nKey: 'menu.dashboard',
    },
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'case-management',
    data: {
      breadcrumb: extract('Case Management'),
      breadcrumbI18nKey: 'menu.caseManagement',
    },
    loadChildren: () =>
      import('./patients-management/patients-management.module').then((m) => m.PatientsManagementModule),
  },
  {
    path: 'questionnaire-management',
    data: {
      breadcrumb: extract('Questionnaire'),
      breadcrumbI18nKey: 'menu.questionnaires',
    },
    loadChildren: () =>
      import('./questionnaire-management/questionnaire-management.module').then((m) => m.QuestionnaireManagementModule),
  },
  {
    path: 'assessments',
    data: {
      breadcrumb: extract('Assessments'),
      breadcrumbI18nKey: 'menu.assessments',
    },
    loadChildren: () => import('./assessment/assessment.module').then((m) => m.AssessmentModule),
  },
  {
    path: 'reports',
    data: {
      breadcrumb: extract('Reports'),
      breadcrumbI18nKey: 'menu.reports',
    },
    loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'user-management',
    data: {
      breadcrumb: extract('User Management'),
    },
    loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
  },
  {
    path: 'administration',
    data: {
      breadcrumb: extract('Administration'),
      breadcrumbI18nKey: 'menu.administration',
    },
    loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
  },
  {
    path: 'feedback',
    data: {
      breadcrumb: extract('Feedback'),
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
