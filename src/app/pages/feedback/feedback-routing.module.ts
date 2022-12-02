import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { FeedbackComponent } from './feedback.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    data: {
      title: extract('Feedback'),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
