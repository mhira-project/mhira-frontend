import { Component } from '@angular/core';
import { AssessmentFormService } from './assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { FullAssessment } from '@app/pages/assessment/@types/assessment';
import { TranslationCode } from '../@shared/@types/translation';
import { translationList } from '../../translations/translation-list';

@UntilDestroy()
@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
})
export class AssessmentFormComponent {
  constructor(
    public assessmentFormService: AssessmentFormService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.activatedRoute.data
      .pipe(
        map((data) => data?.assessment),
        filter((a) => !!a),
        untilDestroyed(this)
      )
      .subscribe((assessment: FullAssessment) => {
        this.assessmentFormService.setAssessment(assessment);
        const [lang] = assessment.questionnaireAssessment.questionnaires.map((q) => q.questionnaire.language) ?? [
          TranslationCode.EN,
        ];
        if (translationList.some((t) => t.code === lang)) this.translateService.use(lang);
      });
  }
}
