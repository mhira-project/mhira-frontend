import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const CryptoJS = require('crypto-js');
import { environment } from '@env/environment';

@Component({
  selector: 'app-do-assessment',
  templateUrl: './do-assessment.component.html',
  styleUrls: ['./do-assessment.component.scss'],
})
export class DoAssessmentComponent implements OnInit {
  questionnaire: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.questionnaire) {
        const bytes = CryptoJS.AES.decrypt(params.questionnaire, environment.secretKey);
        this.questionnaire = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    });
  }
}
