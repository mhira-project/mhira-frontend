import { Form } from '@shared/components/form/@types/form';

export const RoleForm: Form = {
  submitButtonText: 'rolesPermissions.saveRole',
  editButtonText: 'rolesPermissions.editRole',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'Role Name',
          label: 'Role Name',
          translationPath:'rolesPermissions.roleName',
          description: 'rolesPermissions.roleName',
          type: 'text',
          validationMessage: 'rolesPermissions.validationMessage',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'hierarchy',
          title: 'Role hierarchy',
          label: 'Role hierarchy',
          translationPath:'rolesPermissions.roleHierarchy',
          description: 'rolesPermissions.roleHierarchy',
          type: 'number',
          min: 1,
          max: 1000,
          validationMessage: 'rolesPermissions.validationRole',
          isRequired: true,
          disabled: true,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
