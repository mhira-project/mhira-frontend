import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedDepartment } from '../@types/department';

export const DepartmentColumns: TableColumn<Partial<FormattedDepartment>>[] = [
  {
    title: 'Department Name',
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
    title: 'Status',
    name: 'formattedStatus',
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
    sort: true,
    render: 'date',
    filterField: {
      type: 'dateRange',
      value: undefined,
    },
  },
];
