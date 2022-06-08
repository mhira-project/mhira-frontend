import { Form } from '@shared/components/form/@types/form';

export const AssessmentAdministrationForm: Form = {
  submitButtonText: 'Create Assessment Name',
  editButtonText: 'Edit Assessment Name',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Type Name',
          label: 'Type Name',
          description: 'Enter Type Name',
          translationPath: 'forms.assessmentAdministration.typeName',
          type: 'text',
          validationMessage: 'Please Enter Type Name',
          isRequired: true,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
