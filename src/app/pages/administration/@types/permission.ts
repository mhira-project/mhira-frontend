import { Role } from './role';
import { User } from '@app/pages/user-management/@types/user';

export interface Permission {
  id: number;
  name: string;
  guard: string;
  createdAt?: number;
  updatedAt?: number;
  users?: User[];
  roles?: Role[];
}
