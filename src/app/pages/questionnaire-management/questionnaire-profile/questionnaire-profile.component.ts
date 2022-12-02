import { Component, OnInit } from '@angular/core';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { QuestionnaireManagementService } from '@app/pages/questionnaire-management/@services/questionnaire-management.service';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireModel } from '@app/pages/questionnaire-management/@models/questionnaire.model';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-questionnaire-profile',
  templateUrl: './questionnaire-profile.component.html',
  styleUrls: ['./questionnaire-profile.component.scss'],
})
export class QuestionnaireProfileComponent implements OnInit {
  questionnaire: QuestionnaireVersion;

  get questionnaireTitle(): string {
    const name = [this.questionnaire?.name].filter((s) => !!s).join(' ');
    return [name].filter((s) => !!s).join(' - ');
  }

  constructor(
    private qmService: QuestionnaireManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.questionnaire) {
        const bytes = CryptoJS.AES.decrypt(params.questionnaire, environment.secretKey);
        const questionnaire = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.questionnaire = QuestionnaireModel.fromJson(questionnaire);
      }
      console.log(this.questionnaire);
    });
  }
}
