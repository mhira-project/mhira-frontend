import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../i18n';
// import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    data: {
      title: extract('Home'),
    },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    data: {
      title: extract('About'),
    },
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
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
