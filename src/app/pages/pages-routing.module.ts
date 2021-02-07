import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: 'case-management',
    data: {
      breadcrumb: extract('Case Management'),
    },
    loadChildren: () =>
      import('./patients-management/patients-management.module').then((m) => m.PatientsManagementModule),
  },
  {
    path: 'assessments',
    data: {
      breadcrumb: extract('Assessments'),
    },
    loadChildren: () => import('./assessment/assessment.module').then((m) => m.AssessmentModule),
  },
  {
    path: 'reports',
    data: {
      breadcrumb: extract('Reports'),
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
    },
    loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
  },
  {
    path: 'feedback',
    data: {
      breadcrumb: extract('Feedback'),
    },
    loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
  {
    path: 'miscellaneous',
    loadChildren: () => import('./miscellaneous/miscellaneous.module').then((m) => m.MiscellaneousModule),
  },
  {
    path: '',
    redirectTo: 'case-management',
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
