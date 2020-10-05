import { Question } from './question';

export interface Questionnaire {
  id?: number;
  name?: boolean;
  description?: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}
