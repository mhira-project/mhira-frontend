import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Department } from '../@types/department';

export const DepartmentsColumns: TableColumn<Department>[] = [
  {
    title: 'Name',
    name: 'name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Description',
    name: 'description',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Created Date',
    name: 'createdAt',
    render: 'date',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Created Date',
    },
  },
];
