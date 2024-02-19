import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Caregiver } from '../@types/caregiver';

export const CaregiversPatientTable: TableColumn<Caregiver>[] = [
  {
    title: 'First name',
    name: 'firstName',
    translationPath: 'tables.contact.firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Middle name',
    name: 'middleName',
    translationPath: 'tables.contact.middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last name',
    name: 'lastName',
    translationPath: 'tables.contact.lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'E-mail',
    name: 'email',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Phone',
    name: 'phone',
    translationPath: 'tables.contact.phone',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Relation',
    name: 'relation',
    translationPath: 'tables.contact.relation',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Emergency',
    name: 'emergency',
    translationPath: 'tables.contact.emergency',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Note',
    name: 'note',
    translationPath: 'tables.contact.note',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
];
