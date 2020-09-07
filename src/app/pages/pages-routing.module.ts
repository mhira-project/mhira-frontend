import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../i18n';
// import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'assessments',
    loadChildren: () => import('./assessments/assessments.module').then((m) => m.AssessmentsModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
  {
    path: '',
    data: {
      title: extract('Home'),
    },
    redirectTo: 'home',
    pathMatch: 'full',
  },
  /*{
    path: '**',
    component: NotFoundComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
