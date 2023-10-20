import { PermissionGuard } from './../../permission.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireFormComponent } from './questionnaire-profile/questionnaire-form/questionnaire-form.component';
import { PermissionKey } from '../../@shared/@types/permission';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireProfileComponent } from './questionnaire-profile/questionnaire-profile.component';
import { QuestionnaireVersionListComponent } from './questionnaire-version-list/questionnaire-version-list.component';
import { QuestionnaireBundlesListComponent } from './questionnaire-bundles-list/questionnaire-bundles-list.component';
import { CreateQuestionnaireBundleComponent } from './create-questionnaire-bundle/create-questionnaire-bundle.component';

const routes: Routes = [
  {
    path: 'questionnaire-list',
    component: QuestionnaireListComponent,
    data: {
      breadcrumbI18nKey: 'menu.questionnairesList',
      permissions: {
        only: [PermissionKey.VIEW_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'questionnaire-form',
    component: QuestionnaireProfileComponent,
    data: {
      breadcrumbI18nKey: 'menu.uploadQuestionnaire',
      permissions: {
        only: [PermissionKey.MANAGE_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'questionnaire-bundles-list',
    component: QuestionnaireBundlesListComponent,
    data: {
      breadcrumbI18nKey: 'menu.questionnaireBundles',
      permissions: {
        only: [PermissionKey.MANAGE_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'create-questionnaire-bundle',
    component: CreateQuestionnaireBundleComponent,
    data: {
      breadcrumbI18nKey: 'menu.createQuestionnaireBundle',
      permissions: {
        only: [PermissionKey.MANAGE_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'create-questionnaire-bundle/:_id',
    component: CreateQuestionnaireBundleComponent,
    data: {
      breadcrumbI18nKey: 'menu.createQuestionnaireBundle',
      permissions: {
        only: [PermissionKey.MANAGE_QUESTIONNAIRES],
      },
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'questionnaire-version-list',
    component: QuestionnaireVersionListComponent,
    data: {
      breadcrumbI18nKey: 'menu.questionnairesVersionList',
      permissions: {
        only: [PermissionKey.VIEW_QUESTIONNAIRES],
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
