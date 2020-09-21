import { FieldGroup } from './field.group';

export interface Form {
  submitButtonText?: string;
  submitButtonClass?: string;
  groups: FieldGroup[];
}
