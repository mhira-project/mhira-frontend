import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedDisclaimer } from '../@types/disclaimers';

export const DisclaimersColumns: TableColumn<Partial<FormattedDisclaimer>>[] = [
  {
    title: 'Type',
    name: 'formattedType',
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
