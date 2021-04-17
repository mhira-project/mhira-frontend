import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Answer } from '../@types/answer';

@UntilDestroy()
@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public questionnaire: QuestionnaireVersion;
  public answers: Answer[];

  constructor(private activtedRoute: ActivatedRoute, private assessmentFormService: AssessmentFormService) {
    combineLatest([
      this.activtedRoute.params.pipe(
        map((params) => +params?.questionnaireIndex),
        filter((idx) => !isNaN(idx))
      ),
      this.assessmentFormService.assessment$.pipe(filter((assessment) => !!assessment)),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([idx, assessment]) => {
        this.questionnaire = assessment?.questionnaireAssessment?.questionnaires?.[idx];
        this.answers = assessment?.questionnaireAssessment?.answers;
        this.assessmentFormService.setQuestionnaire(this.questionnaire);
      });
  }
}
