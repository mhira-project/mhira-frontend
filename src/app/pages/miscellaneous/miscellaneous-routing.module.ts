import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTabsComponent } from './no-tabs/no-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
          breadcrumbI18nKey: 'menu.notFound',
        },
      },
      {
        path: 'home',
        component: NoTabsComponent,
        data: {
          breadcrumbI18nKey: 'menu.noTabs',
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
