import { Permission } from '../../administration/@types/permission';
import { Role } from '../../administration/@types/role';
import { Department } from '../../administration/@types/department';

export interface CaseManager {
  id?: number;
  username?: string;
  active?: boolean;
  formattedActive?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  workID?: string;
  address?: string;
  gender?: string;
  birthDate?: string;
  formattedBirthDate?: string;
  nationality?: string;
  passwordExpiresAt?: string;
  createdAt?: string;
  formattedCreatedAt?: string;
  roles?: Role[];
  permissionGrants?: Permission[];
  permissions?: Permission[];
  departments?: Department[];
}
