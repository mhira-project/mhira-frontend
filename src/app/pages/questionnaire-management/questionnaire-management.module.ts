import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireFormComponent } from './questionnaire-profile/questionnaire-form/questionnaire-form.component';
import { QuestionnaireManagementRoutingModule } from './questionnaire-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QuestionnaireProfileComponent } from './questionnaire-profile/questionnaire-profile.component';
import { QuestionnaireScriptComponent } from './questionnaire-script/questionnaire-script.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { QuestionnaireVersionListComponent } from './questionnaire-version-list/questionnaire-version-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreateQuestionnaireBundleComponent } from './create-questionnaire-bundle/create-questionnaire-bundle.component';
import { QuestionnaireBundlesListComponent } from './questionnaire-bundles-list/questionnaire-bundles-list.component';
// import { QuestionnaireBundlesService } from './@services/questionnaire-bundles.service';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AssessmentModule } from '../assessment/assessment.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [
        QuestionnaireFormComponent,
        QuestionnaireListComponent,
        QuestionnaireProfileComponent,
        QuestionnaireScriptComponent,
        QuestionnaireVersionListComponent,
        CreateQuestionnaireBundleComponent,
        QuestionnaireBundlesListComponent,
    ],
    imports: [
        CommonModule,
        QuestionnaireManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MasterDataModule,
        NzButtonModule,
        NzGridModule,
        NzRadioModule,
        NzIconModule,
        NzSelectModule,
        AppFormModule,
        NzTabsModule,
        NzDrawerModule,
        NzCardModule,
        NzCheckboxModule,
        NzToolTipModule,
        NzFormModule,
        NzInputModule,
        TranslateModule,
        AssessmentModule,
        AngularEditorModule
    ],
    // Needs to be provided in root, since it will be required by assessment and patient modules.
    // providers:[
    //     QuestionnaireBundlesService
    // ]
})
export class QuestionnaireManagementModule {}
