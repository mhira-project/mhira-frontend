import { User } from './user';

export interface FormattedUser extends User {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedBirthDate?: string;
  formattedRoles?: string;
  formattedStatus?: string;
  formattedDepartments?: string;
}
