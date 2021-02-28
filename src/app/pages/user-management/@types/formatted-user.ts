import { User } from './user';
import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';

export interface FormattedUser extends User {
  formattedRoles?: TagInfo[];
  formattedStatus?: TagInfo;
  formattedDepartments?: TagInfo[];
}
