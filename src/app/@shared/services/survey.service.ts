// src/app/@shared/services/survey.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = environment.surveyServiceURL; // URL from environment

  constructor(private http: HttpClient) {}

  // Fetch surveys
  getSurveys(): Observable<any> {
    return this.http.get(`${this.apiUrl}/surveys`);
  }

  // Fetch a specific survey by ID
  getSurveyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/surveys/${id}`);
  }

  // Submit survey responses
  submitSurveyResponses(surveyId: string, responses: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/surveys/${surveyId}/responses`, responses);
  }
}
