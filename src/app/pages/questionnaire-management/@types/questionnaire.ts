export enum QuestionnaireStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  PRIVATE = 'PRIVATE',
}

export interface ListQuestionnaireInput {
  language?: string;
  abbreviation?: string;
  license?: string;
  timeToComplete?: number;
  status?: QuestionnaireStatus;
}

export interface QuestionnaireVersion {
  _id: string;
  name: string;
  status: QuestionnaireStatus;
  createdAt: Date;
  keywords: string[];
  copyright: string;
  website: string;
  license: string;
  timeToComplete: number;
}
