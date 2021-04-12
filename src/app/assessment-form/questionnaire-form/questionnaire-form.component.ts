import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public questionnaire: QuestionnaireVersion;

  constructor(private activtedRoute: ActivatedRoute, private assessmentFormService: AssessmentFormService) {
    combineLatest([
      this.activtedRoute.params.pipe(
        map((params) => +params?.questionnaireIndex),
        filter((idx) => !isNaN(idx))
      ),
      this.assessmentFormService.assessment$.pipe(filter((assessment) => !!assessment)),
    ]).subscribe(
      ([idx, assessment]) => (this.questionnaire = assessment?.questionnaireAssessment?.questionnaires?.[idx])
    );
  }
}
