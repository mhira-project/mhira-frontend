import { TagInfo } from '@shared/@modules/master-data/@types/list';

export interface SuperSurvey {
  id: string;
  createdAt: Date; // Assuming DateTime maps to JavaScript Date
  updatedAt: Date;
  deletedAt?: Date | null; // Optional, can be null
  fullName: string;
  abbreviation: string;
  description?: string; // Optional
  languages: string[]; // Array of strings
  surveyJsTitle?: string; // Optional
  numberOfItems?: number; // Optional
  surveyJson: string; // Assuming JSON maps to a generic object
  license: License;
  licenseText: string;
  keywords: string[]; // Array of strings
  status: Status;
}

export enum Status {
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum License {
  AllRightsReserved = 'AllRightsReserved',
  CC_BY = 'CC_BY',
  CC_BY_SA = 'CC_BY_SA',
  CC_BY_ND = 'CC_BY_ND',
  CC_BY_NC = 'CC_BY_NC',
  CC_BY_NC_SA = 'CC_BY_NC_SA',
  CC_BY_NC_ND = 'CC_BY_NC_ND',
  PublicDomain = 'PublicDomain',
  Other = 'Other',
}

export interface FormattedSuperSurvey extends SuperSurvey {
  formattedStatus: TagInfo;
  language: string;
  abbreviation: string;
  questionnaireTitle?: string;
}
