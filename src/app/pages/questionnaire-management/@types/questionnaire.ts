import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';
import { Question } from '../../../assessment-form/@types/question';

export enum QuestionnaireStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  PRIVATE = 'PRIVATE',
}

export interface UpdateQuestionnaireInput {
  name?: string;
  language: string;
  timeToComplete: number;
  license?: string;
  copyright: string;
  website?: string;
  description?: string;
  status?: QuestionnaireStatus;
  keywords?: string[];
}

export interface CreateQuestionnaireInput extends UpdateQuestionnaireInput {
  excelFile: File;
}

export interface QuestionnaireVersion {
  zombie: boolean;
  _id: string;
  name: string;
  status: QuestionnaireStatus;
  createdAt: Date;
  keywords: string[];
  description: string;
  copyright: string;
  website: string;
  license: string;
  timeToComplete: number;
  questionnaire: {
    _id: string;
    language: string;
    abbreviation: string;
  };
  questionGroups: Array<{
    label: string;
    questions: Question[];
    uniqueQuestions: any;
  }>;
}

export interface FormattedQuestionnaireVersion extends QuestionnaireVersion {
  formattedStatus: TagInfo;
  language: string;
  abbreviation: string;
  questionnaireTitle?: string;
}
