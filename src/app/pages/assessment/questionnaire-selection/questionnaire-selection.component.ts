import { QuestionnaireStatus } from './../../questionnaire-management/@types/questionnaire';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionnaireVersion } from '../../questionnaire-management/@types/questionnaire';
import { QuestionnaireManagementService } from '../../questionnaire-management/@services/questionnaire-management.service';
import { createSearchFilter } from '../../questionnaire-management/questionnaire-list/questionnaire-list.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { SuperSurveyService } from '@app/pages/super-survey/@services/super-survey.service';
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

  @Input()
  public readonly = false;

  public foundQuestionnaires: any[] = [];

  isVisible = false;
  questionnareActive: any = null;

  constructor(
    private questionnaireService: QuestionnaireManagementService,
    private superSurveyService: SuperSurveyService,
    private clipboard: Clipboard
  ) {}

  public onQuestionnaireSearch(q: string) {
    if (q === '') {
      this.foundQuestionnaires = [];
      return;
    }

    const filter = { or: createSearchFilter(q) };

    // this.questionnaireService
    //   .getQuestionnaires({ filter })
    //   // Added filter to filter out the archieved quest.
    //   .subscribe(
    //     (questionnaires) =>
    //       (this.foundQuestionnaires = questionnaires.edges
    //         .map((e) => e.node)
    //         .filter(
    //           (e) => e.status !== 'ARCHIVED' && e.status !== 'DRAFT' && e.status !== 'PRIVATE' && e.zombie === false
    //         ))
    //   );

    this.superSurveyService
      .getSuperSurveys({})
      .subscribe((data) => (this.foundQuestionnaires = data.edges.map((e) => e.node)));
  }

  public onQuestionnaireSearchNew(q: string) {
    if (q === '') {
      // tslint:disable
      const filter = { or: createSearchFilter(q) };

      // this.questionnaireService
      //   .getQuestionnaires({ filter })
      //   .subscribe(
      //     (questionnaires) =>
      //       (this.foundQuestionnaires = questionnaires.edges
      //         .map((e) => e.node)
      //         .filter(
      //           (e) => e.status !== 'ARCHIVED' && e.status !== 'DRAFT' && e.status !== 'PRIVATE' && e.zombie === false
      //         ))
      //   );

      this.superSurveyService
        .getSuperSurveys({})
        .subscribe((data) => (this.foundQuestionnaires = data.edges.map((e) => e.node)));
    }

    const filter = { or: createSearchFilter(q) };

    // this.questionnaireService
    //   .getQuestionnaires({ filter })
    //   .subscribe(
    //     (questionnaires) =>
    //       (this.foundQuestionnaires = questionnaires.edges
    //         .map((e) => e.node)
    //         .filter(
    //           (e) => e.status !== 'ARCHIVED' && e.status !== 'DRAFT' && e.status !== 'PRIVATE' && e.zombie === false
    //         ))
    //   );

    this.superSurveyService
      .getSuperSurveys({})
      .subscribe((data) => (this.foundQuestionnaires = data.edges.map((e) => e.node)));
  }

  public onToggleQuestionnaire(questionnaire: QuestionnaireVersion): void {
    if (this.isSelected(questionnaire)) {
      this.selectedQuestionnaires.splice(this.selectedIndex(questionnaire), 1);
    } else {
      this.selectedQuestionnaires.push(questionnaire);
      console.log('SELECTED ONES: ', this.selectedQuestionnaires);
    }

    this.selectionChange.emit(this.selectedQuestionnaires);
  }

  public isSelected(questionnaire: any): boolean {
    return !!this.selectedQuestionnaires.find((q: any) => q.id === questionnaire.id);
  }

  public selectedIndex(questionnaire: any): number {
    return this.selectedQuestionnaires.findIndex((q: any) => q.id === questionnaire.id);
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

  // Handling modal

  // tslint:disable
  showModal(questionnaire: any): void {
    this.questionnareActive = questionnaire;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
