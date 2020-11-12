import { Form } from '@shared/components/field-generator/formt';

export const RoleForm: Form = {
  submitButtonText: 'Create Role',
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
          name: 'guard',
          title: 'Guard Name',
          label: 'Guard Name',
          description: 'enter guard name',
          type: 'text',
          validationMessage: 'please enter guard name',
          isRequired: true,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
