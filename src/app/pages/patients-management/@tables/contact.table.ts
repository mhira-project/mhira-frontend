import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Caregiver } from '@app/pages/patients-management/@types/caregiver';
import { Patient } from '@app/pages/patients-management/@types/patient';

export const CaregiverTable: TableColumn<Caregiver>[] = [
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
    title: 'Patients',
    name: 'patients',
    translationPath: 'tables.contact.patients',
    render: 'avatar',
    filterField: {
      type: 'text',
      value: undefined,
    },
    filterQuery: (q: number) =>
      q
        ? {
            or: [
              { firstName: { iLike: `%${q}%` } },
              { middleName: { iLike: `%${q}%` } },
              { lastName: { iLike: `%${q}%` } },
            ] as Array<{ [K in keyof Patient]: any }>,
          }
        : {},
  },
];
