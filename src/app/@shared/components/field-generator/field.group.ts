import { FieldType } from './field.type';

export interface FieldGroup {
  title?: string;
  hidden?: boolean;
  fields: FieldType[];
}
