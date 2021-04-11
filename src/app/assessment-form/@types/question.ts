export const enum QuestionType {
  BEGIN_GROUP = 'begin_group',
  END_GROUP = 'end_group',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  CHECKBOX = 'checkbox',
  TEXT = 'text',
  SELECT_ONE = 'select_one',
  SELECT_MULTIPLE = 'select_multiple',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'date_time',
  NOTE = 'note',
  VISUAL_ANALOG_SCALES = 'visual_analog_scales',
}

export interface Choice {
  _id?: string;
  name?: string;
  label?: string;
  image?: string;
}

export interface Question {
  _id?: string;
  name: string;
  label: string;
  type: QuestionType;
  hint?: string;
  relevant?: string;
  calculation?: string;
  constraint?: string;
  constraintMessage?: string;
  min?: number;
  max?: number;
  required?: boolean;
  requiredMessage?: string;
  image?: string;
  appearance?: string;
  default?: string;
  choices?: Choice[];
}
