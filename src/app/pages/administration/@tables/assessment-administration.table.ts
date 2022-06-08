import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedAssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';

export const AssessmentAdministrationColumns: TableColumn<Partial<FormattedAssessmentAdministration>>[] = [
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
    title: 'Status',
    name: 'formattedStatus',
    translationPath: 'tables.department.formattedStatus',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
    },
  },
  {
    title: 'Last Update',
    name: 'updatedAt',
    translationPath: 'tables.assessmentAdministration.lastUpdate',
  },
];
