import { FullAssessment } from './../../pages/assessment/@types/assessment';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss'],
})
export class AssessmentOverviewComponent {
  public assessment$: Observable<FullAssessment>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.assessment$ = this.activatedRoute.data.pipe(map((data) => data.assessment));
  }
}
