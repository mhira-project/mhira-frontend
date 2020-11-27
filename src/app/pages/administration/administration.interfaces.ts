import { Role } from '@app/pages/administration/@types/role';
import { Permission } from '@app/pages/administration/@types/permission';
import { Department } from '@app/pages/administration/@types/department';

export interface User {
  id?: number;
  workId?: string;
  firstName: string;
  username: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthDate: string;
  active?: boolean;
  roles?: Role[];
  departments?: Department[];
  permissions?: Permission[];
}
