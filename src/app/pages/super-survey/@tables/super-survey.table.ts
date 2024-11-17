import { TableColumn } from '@shared/@modules/master-data/@types/list';
import { FormattedSuperSurvey } from '../@types/super-survey';

export const SuperSurveyColumns: TableColumn<FormattedSuperSurvey>[] = [
  {
    title: 'Full Name',
    name: 'fullName',
    translationPath: 'tables.superSurveys.fullName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Abbreviation',
    name: 'abbreviation',
    translationPath: 'tables.superSurveys.abbreviation',
  },
  {
    title: 'Survey ID',
    name: 'id',
    translationPath: 'tables.superSurveys.surveyId',
  },
  {
    title: 'Languages',
    name: 'languages',
    translationPath: 'tables.superSurveys.languages',
    render: 'array',
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    altName: 'status',
    translationPath: 'tables.superSurveys.status',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Private', value: 'Private' },
      ],
    },
  },
  {
    title: 'Keywords',
    name: 'keywords',
    translationPath: 'tables.superSurveys.keywords',
    render: 'array',
  },
  {
    title: 'Number of Items',
    name: 'numberOfItems',
    translationPath: 'tables.superSurveys.numberOfItems',
  },
  {
    title: 'License',
    name: 'license',
    translationPath: 'tables.superSurveys.license',
  },
  // {
  //   title: 'License Text',
  //   name: 'licenseText',
  //   translationPath: 'tables.superSurveys.licenseText',
  // },
  // {
  //   title: 'Created At',
  //   name: 'createdAt',
  //   translationPath: 'tables.superSurveys.createdAt',
  //   render: 'date',
  //   sort: true,
  // },
  // {
  //   title: 'Updated At',
  //   name: 'updatedAt',
  //   translationPath: 'tables.superSurveys.updatedAt',
  //   render: 'date',
  //   sort: true,
  // },
];
