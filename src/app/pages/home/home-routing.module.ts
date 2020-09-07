import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { HomeComponent } from './home.component';
import { PatientsComponent } from './patients/patients.component';
import { CaseManagersComponent } from './case-managers/case-managers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: extract('Home'),
    },
    children: [
      {
        path: 'patients',
        component: PatientsComponent,
        data: {
          title: extract('Patients'),
        },
      },
      {
        path: 'case-managers',
        component: CaseManagersComponent,
        data: {
          title: extract('Case Managers'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
