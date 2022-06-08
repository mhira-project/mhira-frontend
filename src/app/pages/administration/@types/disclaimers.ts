export enum DisclaimerEnum {
  assessments = 'Assessment',
  loginDisclaimer = 'Login Disclaimer',
  expiredText = 'Assessment Expired',
  plannedText = 'Assessment Planned',
  completedText = 'Assessment Completed',
}

export interface Disclaimers {
  id?: number;
  type: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateDisclaimerInput {
  type: string;
  description: string;
  updatedAt?: Date;
}

export interface FormattedDisclaimer {
  id?: number;
  type: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  formattedType?: string;
}
