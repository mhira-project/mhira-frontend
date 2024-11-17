import { NgModule } from '@angular/core';
import { SuperSurveyRoutingModule } from '@app/pages/super-survey/super-survey-routing.module';
import { SuperSurveyListComponent } from '@app/pages/super-survey/super-survey-list/super-survey-list.component';
import { MasterDataModule } from '@shared/@modules/master-data/master-data.module';
import { DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SuperSurveyDetailsComponent } from '@app/pages/super-survey/super-survey-details/super-survey-details.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  imports: [
    SuperSurveyRoutingModule,
    MasterDataModule,
    NgIf,
    NzButtonModule,
    NzIconModule,
    NzWaveModule,
    TranslateModule,
    RouterLink,
    NzTabsModule,
    JsonPipe,
    NzDescriptionsModule,
    NzCardModule,
    DatePipe,
    NgForOf,
  ],
  exports: [SuperSurveyListComponent, SuperSurveyDetailsComponent],
  declarations: [SuperSurveyListComponent, SuperSurveyDetailsComponent],
  providers: [],
})
export class SuperSurveyModule {}
