import { Permission } from './permission';
import { User } from '@app/pages/user-management/@types/user';

export interface Role {
  id: number;
  name: string;
  isSuperAdmin?: boolean;
  hierarchy: number;
  code: string;
  createdAt?: number;
  updatedAt?: number;
  users?: User[];
  permissions?: Permission[];
}

export interface UpdateOneRoleInput {
  id: number;
  update: {
    name: string;
    hierarchy: number;
  };
}
