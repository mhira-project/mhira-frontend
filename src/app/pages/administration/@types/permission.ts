import { Role } from './role';
import { User } from './user';

export interface Permission {
  id: number;
  name: string;
  guard: string;
  createdAt?: number;
  updatedAt?: number;
  users?: User[];
  roles?: Role[];
}
