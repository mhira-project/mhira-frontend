import { Role } from '@app/pages/administration/@types/role';
import { Permission } from '@app/pages/administration/@types/permission';

export interface User {
  id?: number;
  workId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthDate: string;
  active?: boolean;
  roles?: Role[];
  permissions?: Permission[];
}
