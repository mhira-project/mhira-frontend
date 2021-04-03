import { CreateQuestionnaireInput, QuestionnaireStatus } from './../@types/questionnaire';
import { Form } from '../../../@shared/components/form/@types/form';
import { UpdateQuestionnaireInput } from '../@types/questionnaire';

export const QuestionnaireForm: Form & { groups: { fields: { name: keyof CreateQuestionnaireInput }[] }[] } = {
  submitButtonText: 'Upload Questionnaire',
  editButtonText: 'Edit Questionnaire',
  groups: [
    {
      fields: [
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
          options: [
            // TODO: get these from somewhere central
            { value: 'de', label: 'DE - German' },
            { value: 'en', label: 'EN - English' },
            { value: 'sw', label: 'SW - Swahili' },
          ],
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
          options: [
            // TODO: get these from somewhere central
            { value: 'de', label: 'DE - German' },
            { value: 'en', label: 'EN - English' },
            { value: 'sw', label: 'SW - Swahili' },
          ],
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
