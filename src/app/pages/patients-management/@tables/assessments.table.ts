import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedAssessment } from '@app/pages/assessment/@types/assessment';

export const AssessmentsPatientsTable: TableColumn<FormattedAssessment>[] = [
  {
    title: 'Title',
    name: 'formattedAssessmentType',
    translationPath: 'tables.assessmentsPatients.title',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Manager',
    name: 'formattedClinician',
    translationPath: 'tables.assessmentsPatients.manager',
    sort: false,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Informants',
    name: 'informantType',
    translationPath: 'tables.assessmentsPatients.informant',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  // {
  //   title: 'Questionnaires',
  //   name: 'questionnaires',
  //   translationPath: 'tables.assessmentsPatients.questionnaires',
  //   sort: true,
  //   filterField: {
  //     type: 'text',
  //     value: undefined,
  //   },
  // },
  {
    title: 'Delivery Date',
    name: 'formatedDeliveryDate',
    translationPath: 'tables.assessmentsPatients.deliveryDate',
    sort: false,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Delivery Date',
    },
  },
  {
    title: 'Expiration Date',
    name: 'formatedExpirationDate',
    translationPath: 'tables.assessmentsPatients.expirationDate',
    sort: false,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Expiration Date',
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    translationPath: 'tables.assessmentsPatients.status',
    render: 'tag',
    filterField: {
      type: 'select',
      value: undefined,
      // options added dynamically
    },
  },
];
