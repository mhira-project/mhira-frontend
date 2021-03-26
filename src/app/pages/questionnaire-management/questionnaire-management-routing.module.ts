import { PermissionGuard } from './../../permission.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { extract } from '../../i18n/i18n.service';
import { PermissionKey } from '../../@shared/@types/permission';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';

const routes: Routes = [
  {
    path: 'questionnaire-list',
    component: QuestionnaireListComponent,
    data: {
      title: extract('Questionnaire list'),
      breadcrumb: extract('Questionnaire list'),
      permission: {
        only: [PermissionKey.VIEW_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'questionnaire-form',
    component: QuestionnaireFormComponent,
    data: {
      title: extract('Questionnaire Form'),
      breadcrumb: extract('Questionnaire Form'),
      permission: {
        only: [PermissionKey.MANAGE_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'questionnaire-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireManagementRoutingModule {}