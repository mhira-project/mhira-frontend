import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Disclaimers } from '../@types/disclaimers';

export const DisclaimersColumns: TableColumn<Partial<Disclaimers>>[] = [
  {
    title: 'Type',
    name: 'type',
    translationPath: 'tables.disclaimer.type',
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Text Information',
    name: 'description',
    translationPath: 'tables.disclaimer.textInformation',
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last Update',
    name: 'updatedAt',
    translationPath: 'tables.disclaimer.lastUpdate',
  },
];
