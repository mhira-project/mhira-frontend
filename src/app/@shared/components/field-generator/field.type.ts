export interface FieldType {
  value: number | string | number[] | string[];
  title?: string;
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
    | 'submitButton';
  iconName?: string;
  validationMessage?: string;
  isRequired?: boolean;
  span?: number;
  options?: { value: number | string; label: string }[];
}
