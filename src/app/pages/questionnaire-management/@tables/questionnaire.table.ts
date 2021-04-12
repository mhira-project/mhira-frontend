import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedQuestionnaireVersion } from '../@types/questionnaire';

export const QuestionnaireColumns: TableColumn<FormattedQuestionnaireVersion>[] = [
  {
    title: 'Name',
    name: 'name',
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    altName: 'status',
    render: 'tag',
  },
  {
    title: 'Language',
    name: 'language',
  },
  {
    title: 'Abbreviation',
    name: 'abbreviation',
  },
  {
    title: 'Keywords',
    name: 'keywords',
    render: 'array',
  },
  {
    title: 'Time to complete',
    name: 'timeToComplete',
  },
  {
    title: 'Copyright',
    name: 'copyright',
  },
  {
    title: 'Website',
    name: 'website',
  },
  {
    title: 'License',
    name: 'license',
  },
  {
    title: 'Created at',
    name: 'createdAt',
    render: 'date',
  },
];
