import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { AppFormModule } from '../../@shared/components/form/app-form.module';

@NgModule({
  imports: [CommonModule, AppFormModule, TranslateModule, SharedModule, FeedbackRoutingModule],
  declarations: [FeedbackComponent],
})
export class FeedbackModule {}
