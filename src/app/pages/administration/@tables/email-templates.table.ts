import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
// import { FormattedAssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';

export const EmailTemplatesColumns: TableColumn<any>[] = [
  // {
  //   title: 'Type of Assessment',
  //   name: 'name',
  //   translationPath: 'tables.assessmentAdministration.assessmentType',
  //   sort: true,
  //   filterField: {
  //     type: 'text',
  //     value: 'string',
  //   },
  // },
  // {
  //   title: 'Status',
  //   name: 'formattedStatus',
  //   translationPath: 'tables.department.formattedStatus',
  //   render: 'tag',
  //   filterField: {
  //     type: 'select',
  //     value: 'string',
  //     options: [
  //       { label: 'Active', value: true },
  //       { label: 'Inactive', value: false },
  //     ],
  //   },
  // },
  // {
  //   title: 'Last Update',
  //   name: 'updatedAt',
  //   translationPath: 'tables.assessmentAdministration.lastUpdate',
  // },
  {
    title: 'Name',
    name: 'name',
    translationPath: 'Name',
  },
  {
    title: 'Subject',
    name: 'subject',
    translationPath: 'Subject',
  },
  {
    title: 'Body',
    name: 'body',
    translationPath: 'Body',
  },
  {
    title: 'Status',
    name: 'status',
    translationPath: 'Status',
  },
  {
    title: 'Module',
    name: 'module',
    translationPath: 'Module',
  },
];
