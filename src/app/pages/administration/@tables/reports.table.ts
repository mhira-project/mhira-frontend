import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Reports } from '../@types/reports';

export const ReportsColumns: TableColumn<Partial<Reports>>[] = [
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
    name: 'reportRoles',
    translationPath: 'tables.reports.roles',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
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
