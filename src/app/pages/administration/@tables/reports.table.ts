import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedReport, Reports } from '../@types/reports';

export const ReportsColumns: TableColumn<Partial<FormattedReport>>[] = [
  {
    title: 'tables.reports.name',
    name: 'name',
    translationPath: 'tables.reports.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.reports.resources',
    name: 'resources',
    translationPath: 'tables.reports.resources',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.users.formattedRoles',
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
    title: 'tables.reports.status',
    name: 'status',
    translationPath: 'tables.reports.status',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.reports.repositoryLink',
    name: 'repositoryLink',
    translationPath: 'tables.reports.repositoryLink',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.reports.createdAt',
    name: 'createdAt',
    translationPath: 'tables.reports.createdAt',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
];
