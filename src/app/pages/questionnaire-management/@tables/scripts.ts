import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Scripts } from '../@types/scripts';

export const ScriptColumns: TableColumn<Partial<Scripts>>[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'tables.scripts.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Version',
    name: 'version',
    translationPath: 'tables.scripts.version',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Creator',
    name: 'creator',
    translationPath: 'tables.scripts.creator',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Reports',
    name: 'reports',
    translationPath: 'tables.scripts.reports',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Repository Link',
    name: 'repositoryLink',
    translationPath: 'tables.scripts.repositoryLink',
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
