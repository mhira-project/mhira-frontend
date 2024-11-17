import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireListComponent } from '@app/pages/questionnaire-management/questionnaire-list/questionnaire-list.component';
import { PermissionKey } from '@shared/@types/permission';
import { PermissionGuard } from '@app/permission.guard';
import { SuperSurveyListComponent } from '@app/pages/super-survey/super-survey-list/super-survey-list.component';
import { SuperSurveyDetailsComponent } from '@app/pages/super-survey/super-survey-details/super-survey-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SuperSurveyListComponent,
    data: {
      breadcrumbI18nKey: 'menu.superSurvey',
      permissions: {
        only: [PermissionKey.VIEW_SUPER_SURVEYS],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'view/:_id',
    component: SuperSurveyDetailsComponent,
    data: {
      breadcrumbI18nKey: 'menu.superSurveyDetails',
      permissions: {
        only: [PermissionKey.VIEW_SUPER_SURVEYS],
      },
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class SuperSurveyRoutingModule {}
