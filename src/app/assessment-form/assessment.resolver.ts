import { Observable } from 'rxjs';
import { AssessmentService } from './../pages/assessment/@services/assessment.service';
import { FullAssessment } from './../pages/assessment/@types/assessment';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

const CryptoJS = require('crypto-js');

@Injectable({ providedIn: 'root' })
export class AssessmentResolver implements Resolve<FullAssessment> {
  constructor(private service: AssessmentService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<FullAssessment> {
    try {
      const encryptedId = route.queryParamMap.get('assessment');
      const bytes = CryptoJS.AES.decrypt(encryptedId, environment.secretKey);
      const assessmentUuid = bytes.toString(CryptoJS.enc.Utf8);
      return this.service.getFullPublicAssessment(assessmentUuid);
    } catch (err) {
      console.error('Assessment not found');
    }
  }
}
