import { TagInfo } from '@shared/@modules/master-data/@types/list';
import { Role } from '@app/pages/administration/@types/role';

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
  name: string;
  id: number;
  roleId: number;
  role: Role;
}

export interface UpdateOneReportInput {
  id: number;
  update: UpdateReport;
}

export interface UpdateReport {
  anonymus?: boolean;
  name?: string;
  description?: string;
  status?: boolean;
  appName?: string;
  repositoryLink?: any;
  url?: string;
  resources?: string;
  id?: number;
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
  formattedRoles: TagInfo[];
}
