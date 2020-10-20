import { FieldGroup } from './field.group';

export interface Form {
  submitButtonText?: string;
  editButtonText?: string;
  submitButtonClass?: string;
  groups: FieldGroup[];
}
