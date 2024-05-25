export interface Consent {
  id: number;
  name: string;
  description: string;
  consent1: string;
  consent2?: string;
  submitContent?: string;
}

export interface UpdateOneConsentInput {
  id: number;
  name: string;
  description: string;
  consent1: string;
  consent2: string;
  submitContent: string;
}
