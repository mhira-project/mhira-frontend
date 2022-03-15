import { CreateReportInput, Reports } from '../../administration/@types/reports';
import { TagInfo } from '@shared/@modules/master-data/@types/list';

export interface Scripts {
  id: number;
  name: string;
  version: string;
  scriptText: string;
  creator: string;
  repositoryLink: string;
  createdAt?: string;
  updatedAt?: string;
  questionnaireId: string;
  reports: Reports[];
}

export interface CreateScriptInput {
  id: number;
  name: string;
  version: string;
  scriptText: string;
  creator: string;
  repositoryLink: string;
  createdAt?: string;
  updatedAt?: string;
  questionnaireId: string;
  reports: number[];
}

export interface CreateOneScriptInput {
  script: CreateScriptInput;
}

export interface FormattedScript extends Scripts {
  formattedReports: TagInfo[];
}
