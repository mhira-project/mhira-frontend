export interface Consent {
  id: number;
  name: string;
  description: string;
  consent1: string;
  consent2?: string;
  consent3?: string;
  consent4?: string;
  consent5?: string;
  consent6?: string;
  consent7?: string;
  submitContent?: string;
  title?: string;
  acceptLabel?: string;
  submitLabel?: string;
}

export interface UpdateOneConsentInput {
  id: number;
  name: string;
  description: string;
  consent1: string;
  consent2: string;
  consent3: string;
  consent4: string;
  consent5: string;
  consent6: string;
  consent7: string;
  submitContent: string;
  title?: string;
  acceptLabel?: string;
  submitLabel?: string;
}
