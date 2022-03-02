import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedReport, Reports } from '../@types/reports';

export const ReportsColumns: TableColumn<Partial<FormattedReport>>[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'tables.reports.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Report Type',
    name: 'resources',
    translationPath: 'tables.reports.resources',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Roles',
    name: 'formattedRoles',
    translationPath: 'tables.users.formattedRoles',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      // options will be added dynamically
    },
    filterQuery: (q: number) => (q ? { id: { eq: q } } : { id: { is: null } }),
  },
  {
    title: 'Status',
    name: 'status',
    translationPath: 'tables.reports.status',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Repository Link',
    name: 'repositoryLink',
    translationPath: 'tables.reports.repositoryLink',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Created At',
    name: 'createdAt',
    translationPath: 'tables.reports.createdAt',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
];
