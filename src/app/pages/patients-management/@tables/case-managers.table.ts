import { FormattedUser } from '@app/pages/user-management/@types/formatted-user';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';

export const CaseManagerColumns: TableColumn<FormattedUser>[] = [
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
    title: 'Departments',
    name: 'formattedDepartments',
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
