import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HorizontalLayoutComponent } from '@app/@layout/horizontal/horizontal.layout.component';
import { AuthLayoutComponent } from '@app/@layout/auth/auth.layout.component';
import { VerticalLayoutComponent } from '@app/@layout/vertical/vertical.layout.component';
import { extract } from '@app/i18n';

const appRoutes: Routes = [
  /*{
    path: 'mhira',
    data: {
      breadcrumb: 'Workspace'
    },
    component: HorizontalLayoutComponent,
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },*/
  {
    path: 'mhira',
    data: {
      breadcrumb: extract('Workspace'),
    },
    component: VerticalLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'mhira',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, config)],
  exports: [RouterModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class AppRoutingModule {}
