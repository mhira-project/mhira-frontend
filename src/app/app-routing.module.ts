import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentLayoutComponent } from '@app/@layout/assessment/assessment-layout.component';
import { AuthLayoutComponent } from '@app/@layout/auth/auth.layout.component';
import { BackendLayoutComponent } from '@app/@layout/backend/backend-layout.component';
import { AuthGuard } from '@app/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'assessment',
    component: AssessmentLayoutComponent,
    loadChildren: () => import('./assessment-form/assessment-form.module').then((m) => m.AssessmentFormModule),
  },
  {
    path: 'mhira',
    canActivate: [AuthGuard],
    component: BackendLayoutComponent,
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

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
