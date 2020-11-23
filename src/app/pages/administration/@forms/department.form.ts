import { Form } from '@shared/components/field-generator/form';

export const DepartmentForm: Form = {
  submitButtonText: 'Create Department',
  editButtonText: 'Edit Department',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Department Name',
          label: 'Department Name',
          description: 'enter permission name',
          type: 'text',
          validationMessage: 'please enter permission name',
          isRequired: true,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
