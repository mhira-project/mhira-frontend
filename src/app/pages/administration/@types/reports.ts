import { Role } from './role';
import { TagInfo } from '@shared/@modules/master-data/@types/list';
import { Department } from '@app/pages/administration/@types/department';

export interface Reports {
  id: number;
  anonymus: boolean;
  name: string;
  description: string;
  status: boolean;
  appName: string;
  repositoryLink: any;
  url: string;
  resources: string;
  reportRoles: ReportRole[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOneReportInput {
  report: CreateReportInput;
}

export interface ReportRole {
  id: number;
  roleId: number;
}

export interface UpdateOneReportInput {
  id: number;
  update: CreateReportInput;
}

export interface UpdateReport {
  name: string;
  description: string;
}

export interface CreateReportInput {
  anonymus?: boolean;
  name?: string;
  description?: string;
  status?: boolean;
  appName?: string;
  repositoryLink?: any;
  url?: string;
  resources?: string;
}

export interface FormattedReport extends Reports {
  formattedStatus: TagInfo;
}
