import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { FeedbackComponent } from './feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FeedbackRoutingModule],
  declarations: [FeedbackComponent],
})
export class FeedbackModule {}
