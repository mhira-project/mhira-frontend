import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedQuestionnaireVersion, QuestionnaireStatus } from '../@types/questionnaire';

export const QuestionnaireColumns: TableColumn<FormattedQuestionnaireVersion>[] = [
  {
    title: 'Abbreviation',
    name: 'abbreviation',
    translationPath: 'questionnaires.abbreviation',
  },
  {
    title: 'QuestionnaireId',
    name: '_id',
    translationPath: 'questionnaires.questionnairesId',
  },
  {
    title: 'Language',
    name: 'language',
    translationPath: 'questionnaires.language',
  },
  {
    title: 'Name',
    name: 'name',
    translationPath: 'questionnaires.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'questionnaires.formattedStatus',
    name: 'formattedStatus',
    translationPath: 'questionnaires.formattedStatus',
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
        // { label: QuestionnaireStatus.ARCHIVED, value: QuestionnaireStatus.ARCHIVED },
      ],
    },
  },
  {
    title: 'Keywords',
    name: 'keywords',
    translationPath: 'questionnaires.keywords',
    render: 'array',
  },
  {
    title: 'Time to complete',
    name: 'timeToComplete',
    translationPath: 'questionnaires.timeToComplete',
  },
  {
    title: 'Copyright',
    name: 'copyright',
    translationPath: 'questionnaires.copyright',
  },
  {
    title: 'Website',
    name: 'website',
    translationPath: 'questionnaires.website',
  },
  {
    title: 'License',
    name: 'license',
    translationPath: 'questionnaires.license',
  },
  {
    title: 'Created at',
    name: 'createdAt',
    translationPath: 'questionnaires.createdAt',
    render: 'date',
    sort: true,
  },
];
