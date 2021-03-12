import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';

export interface Department {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface FormattedDepartment extends Department {
  formattedStatus: TagInfo;
}

export interface UpdateOneDepartmentInput {
  id: number;
  update: UpdateDepartment;
}

export interface UpdateDepartment {
  name: string;
  description: string;
  active: boolean;
}
