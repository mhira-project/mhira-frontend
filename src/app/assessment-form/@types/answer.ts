export interface Answer {
  _id?: string;
  question: string;
  textValue?: string;
  multipleChoiceValue?: string[];
  numberValue?: number;
  dateValue?: Date;
  booleanValue?: boolean;
}

export class AnswerAssessmentInput {
  assessmentId: string;
  questionnaireVersionId: string;
  finishedAssessment: boolean;
  question: string;
  textValue?: string;
  dateValue?: Date;
  multipleChoiceValue?: string[];
  numberValue?: number;
  booleanValue?: boolean;
}
