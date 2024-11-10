import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';

export const EmailTemplatesColumns: TableColumn<any>[] = [
  {
    title: 'emailTemplates.name',
    name: 'name',
    translationPath: 'emailTemplates.name',
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'emailTemplates.subject',
    name: 'subject',
    translationPath: 'emailTemplates.subject',
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    render: 'tag',
    translationPath: 'emailTemplates.status',
  },
  {
    title: 'Module',
    name: 'module',
    translationPath: 'emailTemplates.module',
  },
];
