import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedDepartment } from '../@types/department';

export const DepartmentColumns: TableColumn<Partial<FormattedDepartment>>[] = [
  {
    title: 'Department Name',
    name: 'name',
    translationPath: 'tables.department.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Description',
    name: 'description',
    translationPath: 'tables.department.description',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    translationPath: 'tables.department.formattedStatus',
    altName: 'active',
    sort: true,
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
    },
  },
  {
    title: 'Created At',
    name: 'createdAt',
    translationPath: 'tables.department.createdAt',
    sort: true,
    render: 'date',
    filterField: {
      type: 'dateRange',
      value: undefined,
    },
  },
];
