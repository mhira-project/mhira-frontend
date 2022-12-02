import { Field } from './field';

export interface FieldGroup {
  title?: string;
  hidden?: boolean;
  fields: Field[];
  translationPath?: string;
}
