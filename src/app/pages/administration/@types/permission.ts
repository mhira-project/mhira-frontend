import { Role } from './role';
import { User } from '../administration.interfaces';

export interface Permission {
  id: number;
  name: string;
  guard: string;
  createdAt?: number;
  updatedAt?: number;
  users?: User[];
  roles?: Role[];
}
