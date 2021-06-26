import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';
import { CaseManager } from './case-manager';

export interface FormattedCaseManager extends CaseManager {
  formattedRoles?: TagInfo[];
  formattedStatus?: TagInfo;
  formattedDepartments?: TagInfo[];
}
