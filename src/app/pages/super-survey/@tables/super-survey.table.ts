import { TableColumn } from '@shared/@modules/master-data/@types/list';
import { FormattedSuperSurvey } from '../@types/super-survey';

export const SuperSurveyColumns: TableColumn<FormattedSuperSurvey>[] = [
  {
    title: 'Abbreviation',
    name: 'abbreviation',
    translationPath: 'superSurveys.abbreviation',
  },
  {
    title: 'Survey ID',
    name: 'id',
    translationPath: 'superSurveys.surveyId',
  },
  {
    title: 'Languages',
    name: 'languages',
    translationPath: 'superSurveys.languages',
    render: 'array',
  },
  {
    title: 'Full Name',
    name: 'fullName',
    translationPath: 'superSurveys.fullName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'status',
    translationPath: 'superSurveys.status',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Archived', value: 'ARCHIVED' },
      ],
    },
  },
  {
    title: 'Keywords',
    name: 'keywords',
    translationPath: 'superSurveys.keywords',
    render: 'array',
  },
  {
    title: 'Number of Items',
    name: 'numberOfItems',
    translationPath: 'superSurveys.numberOfItems',
  },
  {
    title: 'License',
    name: 'license',
    translationPath: 'superSurveys.license',
  },
  {
    title: 'License Text',
    name: 'licenseText',
    translationPath: 'superSurveys.licenseText',
  },
  {
    title: 'Created At',
    name: 'createdAt',
    translationPath: 'superSurveys.createdAt',
    render: 'date',
    sort: true,
  },
  {
    title: 'Updated At',
    name: 'updatedAt',
    translationPath: 'superSurveys.updatedAt',
    render: 'date',
    sort: true,
  },
];
