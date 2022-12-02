import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Department } from '../@types/department';

export const DepartmentsColumns: TableColumn<Department>[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'tables.departments.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Description',
    name: 'description',
    translationPath: 'tables.departments.description',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Created Date',
    name: 'createdAt',
    translationPath: 'tables.departments.createdAt',
    render: 'date',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Created Date',
    },
  },
];
