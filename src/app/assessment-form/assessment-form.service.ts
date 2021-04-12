import { Injectable } from '@angular/core';
import { FullAssessment } from '@app/pages/assessment/@types/assessment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssessmentFormService {
  private _assessment = new BehaviorSubject<FullAssessment>(null);

  public get assessment$(): Observable<FullAssessment> {
    return this._assessment.asObservable();
  }

  public setAssessment(assessment: FullAssessment): void {
    this._assessment.next(assessment);
  }
}
