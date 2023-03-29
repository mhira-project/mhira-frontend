import { FormattedUser } from '@app/pages/user-management/@types/formatted-user';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';

export const CaseManagerColumns: TableColumn<FormattedUser>[] = [
  {
    title: 'First name',
    name: 'firstName',
    translationPath: 'tables.casemanagers.firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Middle name',
    name: 'middleName',
    translationPath: 'tables.casemanagers.middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last name',
    name: 'lastName',
    translationPath: 'tables.casemanagers.lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Work ID',
    name: 'workID',
    translationPath: 'tables.casemanagers.workID',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Phone',
    name: 'phone',
    translationPath: 'tables.casemanagers.phone',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Username',
    name: 'username',
    translationPath: 'tables.casemanagers.username',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Departments',
    name: 'formattedDepartments',
    translationPath: 'tables.casemanagers.username',
    altName: 'departments',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      // options will be added dynamically
    },
    filterQuery: (q: number) => ({ id: { eq: q } }),
  },
];
