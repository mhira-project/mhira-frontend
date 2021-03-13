import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { CreateQuestionnaireInput } from '../@types/questionnaire';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public excelFile: File;

  constructor(private qmService: QuestionnaireManagementService) {}

  public onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.excelFile = target.files.item(0);
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;
    const input: CreateQuestionnaireInput = form.value;
    input.excelFile = this.excelFile;
    this.qmService.uploadQuestionnaire(input).subscribe(() => {});
  }
}
