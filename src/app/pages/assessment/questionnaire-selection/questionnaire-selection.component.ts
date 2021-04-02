import { ListQuestionnaireInput, QuestionnaireStatus } from './../../questionnaire-management/@types/questionnaire';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionnaireVersion } from '../../questionnaire-management/@types/questionnaire';
import { QuestionnaireManagementService } from '../../questionnaire-management/@services/questionnaire-management.service';

@Component({
  selector: 'app-questionnaire-selection',
  templateUrl: './questionnaire-selection.component.html',
  styleUrls: ['./questionnaire-selection.component.scss'],
})
export class QuestionnaireSelectionComponent {
  @Output()
  public selectionChange = new EventEmitter<QuestionnaireVersion[]>();

  @Input()
  public selectedQuestionnaires: QuestionnaireVersion[] = [];

  public foundQuestionnaires: QuestionnaireVersion[] = [];

  constructor(private questionnaireService: QuestionnaireManagementService) {}

  public onQuestionnaireSearch(q: string) {
    if (q === '') {
      this.foundQuestionnaires = [];
      return;
    }

    // TODO: filter name/keywords aswell
    const filter: ListQuestionnaireInput = {
      abbreviation: `${q}`,
    };

    this.questionnaireService
      .getQuestionnaires(filter)
      .subscribe((questionnaires) => (this.foundQuestionnaires = questionnaires));
  }

  public onToggleQuestionnaire(questionnaire: QuestionnaireVersion): void {
    if (this.isSelected(questionnaire)) {
      this.selectedQuestionnaires.splice(this.selectedIndex(questionnaire), 1);
    } else {
      this.selectedQuestionnaires.push(questionnaire);
    }

    this.selectionChange.emit(this.selectedQuestionnaires);
  }

  public isSelected(questionnaire: QuestionnaireVersion): boolean {
    return !!this.selectedQuestionnaires.find((q) => q._id === questionnaire._id);
  }

  public selectedIndex(questionnaire: QuestionnaireVersion): number {
    return this.selectedQuestionnaires.findIndex((q) => q._id === questionnaire._id);
  }

  public canMove(direction: 'up' | 'down', questionnaire: QuestionnaireVersion): boolean {
    const idx = this.selectedIndex(questionnaire);
    return direction === 'up' ? idx > 0 : idx < this.selectedQuestionnaires.length - 1;
  }

  public move(direction: 'up' | 'down', questionnaire: QuestionnaireVersion): void {
    const idx = this.selectedIndex(questionnaire);

    if (direction === 'up') {
      this.moveArrayItem(idx, idx - 1);
    } else {
      this.moveArrayItem(idx, idx + 1);
    }

    this.selectionChange.emit(this.selectedQuestionnaires);
  }

  public isDisabled(questionnaire: QuestionnaireVersion) {
    return ![QuestionnaireStatus.PRIVATE, QuestionnaireStatus.PUBLISHED].includes(questionnaire.status);
  }

  public tagColor(status: QuestionnaireStatus): string {
    return {
      [QuestionnaireStatus.DRAFT]: 'blue',
      [QuestionnaireStatus.PRIVATE]: 'orange',
      [QuestionnaireStatus.PUBLISHED]: 'green',
      [QuestionnaireStatus.ARCHIVED]: 'red',
    }[status];
  }

  private moveArrayItem(from: number, to: number): void {
    this.selectedQuestionnaires.splice(to, 0, this.selectedQuestionnaires.splice(from, 1)[0]);
  }
}
