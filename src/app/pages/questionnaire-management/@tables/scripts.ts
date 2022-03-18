import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedScript, Scripts } from '../@types/scripts';

export const ScriptColumns: TableColumn<Partial<FormattedScript>>[] = [
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
    name: 'formattedReports',
    translationPath: 'tables.scripts.reports',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      // options will be added dynamically
    },
    filterQuery: (q: number) => (q ? { id: { eq: q } } : { id: { is: null } }),
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
