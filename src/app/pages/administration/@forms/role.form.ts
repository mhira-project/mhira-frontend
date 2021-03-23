import { Form } from '@shared/components/form/@types/form';

export const RoleForm: Form = {
  submitButtonText: 'Save Role',
  editButtonText: 'Edit Role',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Role Name',
          label: 'Role Name',
          description: 'enter permission name',
          type: 'text',
          validationMessage: 'please enter permission name',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'hierarchy',
          title: 'Role hierarchy',
          label: 'Role hierarchy',
          description: 'Enter Role hierarchy',
          type: 'number',
          min: 0,
          max: 1000,
          validationMessage: 'please Enter Role hierarchy',
          isRequired: true,
          disabled: true,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
