import { Form } from '@shared/components/form/@types/form';

export const DepartmentForm: Form = {
  submitButtonText: 'tables.department.createDepartment',   
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
          description: 'tables.department.departmentName',
          translationPath: 'tables.department.departmentName',
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
          description: 'tables.department.description',
          translationPath: 'tables.department.description',
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
          description: 'tables.department.status',
          translationPath: 'tables.department.status',
          type: 'select',
          validationMessage: '',
          isRequired: false,
          span: 24,
          options: [
            { label: 'Active', value: true },
            { label: 'Inactive', value: false },
          ],
        },
      ],
    },
  ],
};
