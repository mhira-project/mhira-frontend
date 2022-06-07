import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { AssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';

export const AssessmentAdministrationColumns: TableColumn<Partial<AssessmentAdministration>>[] = [
  {
    title: 'Type of Assessment',
    name: 'name',
    translationPath: 'tables.assessmentAdministration.assessmentType',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last Update',
    name: 'updatedAt',
    translationPath: 'tables.assessmentAdministration.lastUpdate',
  },
];
