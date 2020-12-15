export interface Field {
  value: number | string | number[] | string[];
  title?: string;
  name?: string;
  description?: string;
  label?: string;
  type:
    | 'text'
    | 'number'
    | 'password'
    | 'search'
    | 'textArea'
    | 'checkBox'
    | 'radio'
    | 'select'
    | 'date'
    | 'dateRange'
    | 'array';
  children?: Field[];
  rows?: any;
  iconName?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  validationMessage?: string;
  isRequired?: boolean;
  isValid?: boolean;
  span?: number;
  options?: {
    value: number | boolean | string;
    label: string;
  }[];
}
