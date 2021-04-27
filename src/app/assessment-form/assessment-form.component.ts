import { Component } from '@angular/core';
import { AssessmentFormService } from './assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
})
export class AssessmentFormComponent {
  constructor(public assessmentFormService: AssessmentFormService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data
      .pipe(
        map((data) => data?.assessment),
        filter((a) => !!a),
        untilDestroyed(this)
      )
      .subscribe((assessment) => this.assessmentFormService.setAssessment(assessment));
  }
}
