import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTabsComponent } from './no-tabs/no-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    data: {
      title: extract('Miscellaneous'),
    },
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
          title: extract('Not Found'),
        },
      },
      {
        path: 'home',
        component: NoTabsComponent,
        data: {
          title: extract('No Tabs'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule {}
