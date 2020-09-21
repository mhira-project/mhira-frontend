import { FieldGroup } from './field.group';

export interface Form {
  submitButtonText?: string;
  groups: FieldGroup[];
}
