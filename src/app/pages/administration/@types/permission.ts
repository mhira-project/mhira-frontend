import { Role } from './role';
import { User } from '@app/pages/user-management/@types/user';
import { PermissionKey } from '@shared/@types/permission';

export interface Permission {
  id: number;
  name: PermissionKey;
  createdAt?: number;
  updatedAt?: number;
  users?: User[];
  roles?: Role[];
}
