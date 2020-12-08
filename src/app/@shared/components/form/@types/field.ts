export interface Field {
  value: number | string | number[] | string[];
  title?: string;
  name?: string;
  description?: string;
  label?: string;
  type: 'text' | 'number' | 'password' | 'search' | 'textArea' | 'checkBox' | 'radio' | 'select' | 'date' | 'dateRange';
  iconName?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  validationMessage?: string;
  isRequired?: boolean;
  span?: number;
  isArray?: boolean;
  options?: { value: number | boolean | string; label: string }[];
}
