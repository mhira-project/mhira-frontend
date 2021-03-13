import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public xlsForm: File;

  constructor(private qmService: QuestionnaireManagementService) {}

  public onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.xlsForm = target.files.item(0);
  }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.qmService.uploadQuestionnaire(this.xlsForm).subscribe(() => {});
  }
}
