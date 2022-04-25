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
}
