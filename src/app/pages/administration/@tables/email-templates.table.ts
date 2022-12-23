import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';

export const EmailTemplatesColumns: TableColumn<any>[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'emailTemplates.name',
  },
  {
    title: 'Subject',
    name: 'subject',
    translationPath: 'emailTemplates.subject',
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
