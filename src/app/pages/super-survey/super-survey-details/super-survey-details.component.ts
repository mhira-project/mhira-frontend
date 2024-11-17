import { Component, OnInit } from '@angular/core';
import { SuperSurvey } from '@app/pages/super-survey/@types/super-survey';
import { environment } from '@env/environment';
import { QuestionnaireModel } from '@app/pages/questionnaire-management/@models/questionnaire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperSurveyService } from '@app/pages/super-survey/@services/super-survey.service';

@Component({
  selector: 'app-super-survey-details',
  templateUrl: 'super-survey-details.component.html',
  styles: [
    `
      nz-card {
        margin: 20px;
      }

      ul {
        padding-left: 20px;
      }

      ul li {
        list-style: disc;
      }
    `,
  ],
})
export class SuperSurveyDetailsComponent implements OnInit {
  superSurvey: SuperSurvey;

  constructor(
    private activatedRoute: ActivatedRoute,
    private superSurveyService: SuperSurveyService,
    private router: Router
  ) {}

  get superSurveyTitle(): string {
    const name = [this.superSurvey?.fullName].filter((s) => !!s).join(' ');
    return [name].filter((s) => !!s).join(' - ');
  }

  ngOnInit(): void {
    this.getSuperSurvey();
  }

  getSuperSurvey() {
    this.activatedRoute.params.subscribe((params) => {
      if (params._id) {
        this.superSurveyService.getOneSuperSurvey(params._id).subscribe((res) => {
          this.superSurvey = res;
        });
      }
    });
  }
}
