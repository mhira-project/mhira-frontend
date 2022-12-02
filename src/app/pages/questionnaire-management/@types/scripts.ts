import { CreateReportInput, Reports } from '../../administration/@types/reports';
import { TagInfo } from '@shared/@modules/master-data/@types/list';

export interface Scripts {
  id: number;
  name: string;
  version: string;
  scriptText: File;
  creator: string;
  repositoryLink: string;
  createdAt?: string;
  updatedAt?: string;
  questionnaireId: string;
  reports: Reports[];
}

export interface CreateOneScriptInput {
  id?: number;
  name?: string;
  version?: string;
  scriptText: File;
  creator?: string;
  repositoryLink?: string;
  createdAt?: string;
  updatedAt?: string;
  questionnaireId?: string;
  reportIds?: number[];
}

export interface UpdateOneScriptInput {
  id?: number;
  update: UpdateScript;
}

export interface UpdateScript {
  name?: string;
  version?: string;
  creator?: string;
  scriptText: File;
  repositoryLink?: string;
  createdAt?: string;
  updatedAt?: string;
  questionnaireId?: string;
  reportIds?: number[];
}

export interface FormattedScript extends Scripts {
  formattedReports: TagInfo[];
}
