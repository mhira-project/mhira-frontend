import { CreateQuestionnaireInput, QuestionnaireStatus } from './../@types/questionnaire';
import { Form } from '../../../@shared/components/form/@types/form';
import { UpdateQuestionnaireInput } from '../@types/questionnaire';
import { getNames } from '@cospired/i18n-iso-languages';

export const QuestionnaireForm: Form & { groups: { fields: { name: keyof CreateQuestionnaireInput }[] }[] } = {
  submitButtonText: 'Upload Questionnaire',
  editButtonText: 'Edit Questionnaire',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Name',
          description: 'Name',
          type: 'text',
          span: 12,
        },
        {
          value: undefined,
          name: 'excelFile',
          title: 'XSL Form',
          description: 'XLS Form',
          type: 'file',
          span: 12,
          isRequired: true,
        },
        {
          value: QuestionnaireStatus.DRAFT,
          name: 'status',
          title: 'Status',
          description: 'Status',
          type: 'select',
          span: 12,
          isRequired: true,
          options: [
            { value: QuestionnaireStatus.DRAFT, label: 'Draft' },
            { value: QuestionnaireStatus.PRIVATE, label: 'Private' },
            { value: QuestionnaireStatus.PUBLISHED, label: 'Published' },
            { value: QuestionnaireStatus.ARCHIVED, label: 'Archived' },
          ],
        },
        {
          value: '',
          name: 'language',
          title: 'Language',
          description: 'Language',
          type: 'select',
          span: 12,
          isRequired: true,
          // TODO: get from correct language
          options: Object.entries(getNames('en'))
            .map(([value, label]) => ({ label, value }))
            .sort((prev, next) => prev.label.localeCompare(next.label)),
        },
        {
          value: '',
          name: 'copyright',
          title: 'Copyright',
          description: 'Copyright',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: undefined,
          name: 'timeToComplete',
          title: 'Time to complete (minutes)',
          description: 'Time to complete (minutes)',
          type: 'number',
          span: 12,
        },
        {
          value: '',
          name: 'website',
          title: 'Website',
          description: 'Website',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'license',
          title: 'License',
          description: 'License',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'keywords',
          title: 'Keywords (space separated)',
          description: 'Keywords (space separated)',
          type: 'text',
          span: 24,
          validationMessage: 'Please enter space separated keywords',
        },
      ],
    },
  ],
};

export const QuestionnaireUpdateForm: Form & { groups: { fields: { name: keyof UpdateQuestionnaireInput }[] }[] } = {
  submitButtonText: 'Upload Questionnaire',
  editButtonText: 'Edit Questionnaire',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Name',
          description: 'Name',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: '',
          name: 'abbreviation',
          title: 'Abbreviation',
          description: 'Abbreviation',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: QuestionnaireStatus.DRAFT,
          name: 'status',
          title: 'Status',
          description: 'Status',
          type: 'select',
          span: 12,
          isRequired: true,
          options: [
            { value: QuestionnaireStatus.DRAFT, label: 'Draft' },
            { value: QuestionnaireStatus.PRIVATE, label: 'Private' },
            { value: QuestionnaireStatus.PUBLISHED, label: 'Published' },
            { value: QuestionnaireStatus.ARCHIVED, label: 'Archived' },
          ],
        },
        {
          value: '',
          name: 'language',
          title: 'Language',
          description: 'Language',
          type: 'select',
          span: 12,
          isRequired: true,
          // TODO: get from correct language
          options: Object.entries(getNames('en'))
            .map(([value, label]) => ({ label, value }))
            .sort((prev, next) => prev.label.localeCompare(next.label)),
        },
        {
          value: '',
          name: 'copyright',
          title: 'Copyright',
          description: 'Copyright',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: undefined,
          name: 'timeToComplete',
          title: 'Time to complete (minutes)',
          description: 'Time to complete (minutes)',
          type: 'number',
          span: 12,
        },
        {
          value: '',
          name: 'website',
          title: 'Website',
          description: 'Website',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'license',
          title: 'License',
          description: 'License',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'keywords',
          title: 'Keywords (space separated)',
          description: 'Keywords (space separated)',
          type: 'text',
          span: 24,
          validationMessage: 'Please enter space separated keywords',
        },
      ],
    },
  ],
};
