import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedUser } from '../@types/formatted-user';

export const UserColumns: TableColumn<FormattedUser>[] = [
  {
    title: 'tables.users.firstName',
    name: 'firstName',
    translationPath: 'tables.users.firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.middleName',
    name: 'middleName',
    translationPath: 'tables.users.middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.lastName',
    name: 'lastName',
    translationPath: 'tables.users.lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.workID',
    name: 'workID',
    translationPath: 'tables.users.workID',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.phone',
    name: 'phone',
    translationPath: 'tables.users.phone',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.username',
    name: 'username',
    translationPath: 'tables.users.username',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.formattedStatus',
    name: 'formattedStatus',
    translationPath: 'tables.users.formattedStatus',
    altName: 'active',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'tables.users.inactive', value: false },
        { label: 'tables.users.active', value: true },
      ],
    },
  },
  {
    title: 'tables.users.formattedRoles',
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
    title: 'tables.users.formattedDepartments',
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
