export interface Answer {
  _id?: string;
  question: string;
  textValue?: string;
  multipleChoiceValue?: string[];
  numberValue?: number;
  dateValue?: Date;
  booleanValue?: boolean;
}
