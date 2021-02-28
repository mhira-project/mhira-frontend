import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedUser } from '../@types/formatted-user';

export const UserColumns: TableColumn<FormattedUser>[] = [
  {
    title: 'First name',
    name: 'firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Middle name',
    name: 'middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last name',
    name: 'lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Work ID',
    name: 'workID',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Phone',
    name: 'phone',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Username',
    name: 'username',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
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
    render: 'tag',
  },
  {
    title: 'Departments',
    name: 'formattedDepartments',
    render: 'tag',
  },
];
