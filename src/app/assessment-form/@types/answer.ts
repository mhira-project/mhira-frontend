export interface Answer {
  _id?: string;
  question: string;
  valid?: boolean;
  textValue?: string;
  multipleChoiceValue?: string[];
  numberValue?: number;
  dateValue?: Date;
  booleanValue?: boolean;
}

export class AnswerAssessmentInput {
  assessmentId: string;
  questionnaireVersionId: string;
  question: string;
  textValue?: string;
  dateValue?: Date;
  multipleChoiceValue?: string[];
  numberValue?: number;
  booleanValue?: boolean;
}
