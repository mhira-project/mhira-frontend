import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-questionnaire-info',
  templateUrl: './questionnaire-info.component.html',
  styleUrls: ['./questionnaire-info.component.scss'],
})
export class QuestionnaireInfoComponent {
  @Input() public website: string;
}
