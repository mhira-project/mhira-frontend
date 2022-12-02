export interface FormItemType {
  label: string;
  extraLabel?: string;
  extraField?: boolean;
  name: string;
  type:
    | 'text'
    | 'textArea'
    | 'checkBox'
    | 'text-array'
    | 'radio'
    | 'meta'
    | 'password'
    | 'switch'
    | 'number'
    | 'select'
    | 'date'
    | 'metaWithOptions'
    | 'fieldGroup';
  pattern: string;
  fields?: FormItemType[];
  description: string;
  validationMessage: string;
  isRequired: boolean;
  selections?: any[];
  fillPercent: number;
  hideWhenEqualTo?: {
    inputName: string;
    value: any;
  };
}
