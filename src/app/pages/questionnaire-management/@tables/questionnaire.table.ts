import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedQuestionnaireVersion, QuestionnaireStatus } from '../@types/questionnaire';

export const QuestionnaireColumns: TableColumn<FormattedQuestionnaireVersion>[] = [
  {
    title: 'Name',
    name: 'name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    altName: 'status',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      options: [
        { label: QuestionnaireStatus.DRAFT, value: QuestionnaireStatus.DRAFT },
        { label: QuestionnaireStatus.PRIVATE, value: QuestionnaireStatus.PRIVATE },
        { label: QuestionnaireStatus.PUBLISHED, value: QuestionnaireStatus.PUBLISHED },
        { label: QuestionnaireStatus.ARCHIVED, value: QuestionnaireStatus.ARCHIVED },
      ],
    },
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
    sort: true,
  },
];
