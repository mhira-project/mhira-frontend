import { TagInfo } from '@shared/@modules/master-data/@types/list';

export enum AssessmentAdministrationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface AssessmentAdministration {
  id?: number;
  name: string;
  status: AssessmentAdministrationStatus;
  updatedAt?: string;
}

export interface FormattedAssessmentAdministration extends AssessmentAdministration {
  formattedStatus: TagInfo;
}
