import { Component, OnInit } from '@angular/core';
import { AssessmentFormService } from './assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, finalize } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { FullAssessment } from '@app/pages/assessment/@types/assessment';
import { TranslationCode } from '../@shared/@types/translation';
import { translationList } from '../../translations/translation-list';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';

@UntilDestroy()
@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
})
export class AssessmentFormComponent implements OnInit {
  public disclaimer: Disclaimers;
  public data: Partial<Disclaimers>[];
  public isLoading = false;

  constructor(
    public assessmentFormService: AssessmentFormService,
    private disclaimersService: DisclaimersService,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorHandlerService,
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

  ngOnInit() {
    this.getDescription();
  }

  private getDescription(): void {
    this.disclaimersService
      .disclaimers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.disclaimer = data.disclaimers.find((disclaimers: any) => disclaimers.type === 'assessments');
          console.log(this.disclaimer);
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load disclaimers' })
      );
  }
}
