import { Role } from './role';
import { Permission } from './permission';
import { Department } from './department';

export interface User {
  id?: number;
  isSuperUser?: boolean;
  username?: string;
  active?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  workID?: string;
  address?: string;
  gender?: string;
  birthDate?: string;
  nationality?: string;
  passwordExpiresAt?: string;
  passwordChangeRequired?: boolean;
  createdAt?: string;
  updatedAt?: string;
  roles?: Role[];
  departments?: Department[];
  permissions?: Permission[];
}

export interface CreateOneUserInput {
  user: CreateUserInput;
}

export interface UpdateOneUserInput {
  id: number;
  update: CreateUserInput;
}

export interface CreateUserInput {
  username?: string;
  password?: string;
  active?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  workID?: string;
  address?: string;
  gender?: string;
  birthDate?: string;
  nationality?: string;
}
