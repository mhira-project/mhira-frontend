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
  roles: Role[];
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

export interface DeleteOneReportInput {
  id: number;
}

export interface UpdateReport {
  id?: number;
  anonymus?: boolean;
  name?: string;
  description?: string;
  status?: boolean;
  appName?: string;
  repositoryLink?: any;
  url?: string;
  resources?: string;
  roles: number[];
}

export interface CreateReportInput {
  id: number;
  anonymus?: boolean;
  name?: string;
  description?: string;
  status?: boolean;
  appName?: string;
  repositoryLink?: any;
  url?: string;
  resources?: string;
  roles: number[];
}

export interface FormattedReport extends Reports {
  formattedRoles: TagInfo[];
}
