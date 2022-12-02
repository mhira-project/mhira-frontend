import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedUser } from '../@types/formatted-user';

export const UserColumns: TableColumn<FormattedUser>[] = [
  {
    title: 'First name',
    name: 'firstName',
    translationPath: 'tables.users.firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Middle name',
    name: 'middleName',
    translationPath: 'tables.users.middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last name',
    name: 'lastName',
    translationPath: 'tables.users.lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Work ID',
    name: 'workID',
    translationPath: 'tables.users.workID',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Phone',
    name: 'phone',
    translationPath: 'tables.users.phone',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Username',
    name: 'username',
    translationPath: 'tables.users.username',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    translationPath: 'tables.users.formattedStatus',
    altName: 'active',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'Inactive', value: false },
        { label: 'Active', value: true },
      ],
    },
  },
  {
    title: 'Roles',
    name: 'formattedRoles',
    translationPath: 'tables.users.formattedRoles',
    altName: 'roles',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      // options will be added dynamically
    },
    filterQuery: (q: number) => (q ? { id: { eq: q } } : { id: { is: null } }),
  },
  {
    title: 'Departments',
    name: 'formattedDepartments',
    translationPath: 'tables.users.formattedDepartments',
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
