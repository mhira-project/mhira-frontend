import { Form } from '@shared/components/form/@types/form';

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
        {
          value: '',
          name: 'description',
          title: 'description',
          label: 'Description',
          description: '',
          type: 'text',
          validationMessage: '',
          isRequired: false,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'active',
          title: 'Status',
          label: 'Status',
          description: '',
          type: 'select',
          validationMessage: '',
          isRequired: false,
          span: 24,
          options: [
            { label: 'Active', value: true },
            { label: 'InActive', value: false },
          ],
        },
      ],
    },
  ],
};
