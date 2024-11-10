import { CreateQuestionnaireInput, QuestionnaireStatus } from './../@types/questionnaire';
import { Form } from '../../../@shared/components/form/@types/form';
import { UpdateQuestionnaireInput } from '../@types/questionnaire';
import { getNames } from '@cospired/i18n-iso-languages';

export const QuestionnaireForm: Form & { groups: { fields: { name: keyof CreateQuestionnaireInput }[] }[] } = {
  submitButtonText: 'menu.uploadQuestionnaire',
  editButtonText: 'Edit Questionnaire',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Name',
          translationPath: 'questionnairesForm.name',
          description: 'questionnairesForm.name',
          type: 'text',
          span: 12,
        },
        {
          value: undefined,
          name: 'excelFile',
          title: 'XSL Form',
          translationPath: 'questionnairesForm.excelFile',
          description: 'questionnairesForm.excelFile',
          type: 'file',
          span: 12,
          isRequired: true,
        },
        {
          value: QuestionnaireStatus.DRAFT,
          name: 'status',
          title: 'Status',
          translationPath: 'questionnairesForm.status',
          description: 'questionnairesForm.status',
          type: 'select',
          span: 12,
          isRequired: true,
          options: [
            // { value: QuestionnaireStatus.DRAFT, label: 'Draft' },
            // { value: QuestionnaireStatus.PRIVATE, label: 'Private' },
            { value: QuestionnaireStatus.PUBLISHED, label: 'Published' },
            // { value: QuestionnaireStatus.ARCHIVED, label: 'Archived' },
          ],
        },
        {
          value: '',
          name: 'language',
          title: 'Language',
          translationPath: 'questionnairesForm.language',
          description: 'questionnairesForm.language',
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
          title: 'Copyright2',
          translationPath: 'questionnairesForm.copyright',
          description: 'questionnairesForm.copyright',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: undefined,
          name: 'timeToComplete',
          title: 'Time to complete (minutes)',
          translationPath: 'questionnairesForm.timeToComplete',
          description: 'questionnairesForm.timeToComplete',
          type: 'number',
          span: 12,
        },
        {
          value: '',
          name: 'website',
          title: 'Website',
          translationPath: 'questionnairesForm.website',
          description: 'questionnairesForm.website',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'license',
          title: 'License',
          translationPath: 'questionnairesForm.license',
          description: 'questionnairesForm.license',
          type: 'text',
          span: 12,
        },
        // {
        //   value: '',
        //   name: 'keywords',
        //   title: 'Keywords (space separated)',
        //   translationPath: 'questionnairesForm.keywords',
        //   description: 'Keywords (space separated)',
        //   type: 'text',
        //   span: 24,
        //   validationMessage: 'Please enter space separated keywords',
        // },
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
          translationPath: 'questionnairesForm.name',
          description: 'Name',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: QuestionnaireStatus.DRAFT,
          name: 'status',
          title: 'Status',
          translationPath: 'questionnairesForm.status',
          description: 'Status',
          type: 'select',
          span: 12,
          isRequired: true,
          options: [
            // { value: QuestionnaireStatus.DRAFT, label: 'Draft' },
            // { value: QuestionnaireStatus.PRIVATE, label: 'Private' },
            { value: QuestionnaireStatus.PUBLISHED, label: 'Published' },
            // { value: QuestionnaireStatus.ARCHIVED, label: 'Archived' },
          ],
        },
        {
          value: '',
          name: 'language',
          title: 'Language',
          translationPath: 'questionnairesForm.language',
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
          translationPath: 'questionnairesForm.copyright',
          description: 'Copyright',
          type: 'text',
          span: 12,
          isRequired: true,
        },
        {
          value: undefined,
          name: 'timeToComplete',
          translationPath: 'questionnairesForm.timeToComplete',
          title: 'Time to complete (minutes)',
          description: 'Time to complete (minutes)',
          type: 'number',
          span: 12,
        },
        {
          value: '',
          name: 'website',
          title: 'Website',
          translationPath: 'questionnairesForm.website',
          description: 'Website',
          type: 'text',
          span: 12,
        },
        {
          value: '',
          name: 'license',
          title: 'License',
          translationPath: 'questionnairesForm.license',
          description: 'License',
          type: 'text',
          span: 12,
        },
        // {
        //   value: '',
        //   name: 'keywords',
        //   title: 'Keywords (space separated)',
        //   translationPath: 'questionnairesForm.keywords',
        //   description: 'Keywords (space separated)',
        //   type: 'text',
        //   span: 24,
        //   validationMessage: 'Please enter space separated keywords',
        // },
      ],
    },
  ],
};
