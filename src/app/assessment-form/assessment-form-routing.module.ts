import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
import { extract } from '../i18n/i18n.service';
import { AssessmentResolver } from './assessment.resolver';

const routes: Routes = [
  {
    path: 'overview',
    component: AssessmentOverviewComponent,
    resolve: { assessment: AssessmentResolver },
    data: {
      breadcrumb: extract('Assessment Overview'),
    },
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentFormRoutingModule {}
