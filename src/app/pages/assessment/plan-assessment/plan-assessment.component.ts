import { Component, OnInit } from '@angular/core';
import { planAssessmentForm } from '@app/pages/assessment/@forms/plan-assessment.form';

@Component({
  selector: 'app-plan-assessment',
  templateUrl: './plan-assessment.component.html',
  styleUrls: ['./plan-assessment.component.scss'],
})
export class PlanAssessmentComponent implements OnInit {
  modalIsVisible = false;
  modalIsLoading = false;
  isLoading = false;
  loadingMessage = '';
  questionnaires: any[];
  addedQuestionnaires = [1, 2, 3, 4];
  planAssessmentForm = planAssessmentForm;

  constructor() {}

  ngOnInit(): void {}

  searchQuestionnaires() {}

  handleCancel() {
    this.modalIsVisible = false;
  }

  handleAddQuestionaire(): void {
    this.modalIsVisible = true;
  }

  submitForm(form: any) {}
}
