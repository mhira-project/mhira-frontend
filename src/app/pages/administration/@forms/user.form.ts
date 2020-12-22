import { Form } from '../../../@shared/components/form/@types/form';

const updateUserPassword: Form = {
  submitButtonText: 'Change password',
  groups: [
    {
      fields: [
        {
          title: 'Enter New Password',
          name: 'newPassword',
          label: 'New Password',
          type: 'password',
          isRequired: true,
          description: 'Enter new password',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: 'Repeat Password',
          name: 'newPasswordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          isRequired: true,
          description: 'Repeat password',
          validationMessage: '',
          span: 24,
          value: '',
        },
      ],
    },
  ],
};

const changeUserPassword: Form = {
  submitButtonText: 'Change password',
  groups: [
    {
      fields: [
        {
          title: 'Enter current Password',
          name: 'currentPassword',
          label: 'New Password',
          type: 'password',
          isRequired: true,
          description: 'Enter current password',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: 'Enter New Password',
          name: 'newPassword',
          label: 'New Password',
          type: 'password',
          isRequired: true,
          description: 'Enter new password',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: 'Repeat Password',
          name: 'newPasswordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          isRequired: true,
          description: 'Repeat password',
          validationMessage: '',
          span: 24,
          value: '',
        },
      ],
    },
  ],
};

const userProfile: Form = {
  submitButtonText: 'Save User',
  editButtonText: 'Edit User',
  submitButtonClass: 'right-align-submit',
  groups: [
    {
      title: 'Personal Information',
      fields: [
        {
          title: 'Login Username',
          label: 'Username',
          name: 'username',
          type: 'text',
          isRequired: true,
          description: 'Enter Username',
          validationMessage: 'Please enter valid username',
          span: 12,
          value: '',
        },
        {
          title: 'ID',
          label: 'ID',
          name: 'workID',
          type: 'text',
          isRequired: true,
          description: 'Enter work id',
          validationMessage: 'Please fill in ID',
          span: 12,
          value: '',
        },
        {
          title: 'Email',
          label: 'Email',
          name: 'email',
          type: 'text',
          isRequired: false,
          description: 'Enter valid email',
          validationMessage: 'Please enter valid email',
          span: 24,
          value: '',
        },
        {
          title: 'First Name',
          label: 'First name',
          name: 'firstName',
          type: 'text',
          isRequired: true,
          description: 'Enter your first name',
          validationMessage: 'Please enter your First name',
          span: 8,
          value: '',
        },
        {
          title: 'Middle Name',
          label: 'Middle name',
          name: 'middleName',
          type: 'text',
          isRequired: false,
          description: 'Enter your middle name',
          validationMessage: 'Please enter your Middle name',
          span: 8,
          value: '',
        },
        {
          title: 'Last Name',
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          isRequired: true,
          description: 'Enter your last name',
          validationMessage: 'Please enter your last name',
          span: 8,
          value: '',
        },

        {
          title: 'Phone number',
          label: 'Phone number',
          name: 'phone',
          type: 'text',
          isRequired: false,
          description: 'Enter phone number',
          validationMessage: 'Please fill phone number',
          span: 8,
          value: '',
        },

        {
          title: 'Password',
          label: 'Password',
          name: 'password',
          type: 'password',
          isRequired: true,
          description: 'Enter Password',
          validationMessage: 'Please fill password',
          span: 8,
          value: '',
        },
        {
          title: 'Repeat Password',
          name: 'passwordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          isRequired: true,
          description: 'Repeat password',
          validationMessage: '',
          span: 8,
          value: '',
        },
      ],
    },
  ],
};

const userProfileEdit: Form = {
  submitButtonText: 'Save User',
  editButtonText: 'Edit User',
  submitButtonClass: 'right-align-submit',
  groups: [
    {
      title: 'Personal Information',
      fields: [
        {
          title: 'Login Username',
          label: 'Username',
          name: 'username',
          type: 'text',
          isRequired: true,
          description: 'Enter Username',
          validationMessage: 'Please enter valid username',
          span: 12,
          value: '',
        },
        {
          title: 'ID',
          label: 'ID',
          name: 'workID',
          type: 'text',
          isRequired: true,
          description: 'Enter work id',
          validationMessage: 'Please fill in ID',
          span: 12,
          value: '',
        },
        {
          title: 'Email',
          label: 'Email',
          name: 'email',
          type: 'text',
          isRequired: false,
          description: 'Enter valid email',
          validationMessage: 'Please enter valid email',
          span: 24,
          value: '',
        },
        {
          title: 'First Name',
          label: 'First name',
          name: 'firstName',
          type: 'text',
          isRequired: true,
          description: 'Enter your first name',
          validationMessage: 'Please enter your First name',
          span: 8,
          value: '',
        },
        {
          title: 'Middle Name',
          label: 'Middle name',
          name: 'middleName',
          type: 'text',
          isRequired: false,
          description: 'Enter your middle name',
          validationMessage: 'Please enter your Middle name',
          span: 8,
          value: '',
        },
        {
          title: 'Last Name',
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          isRequired: true,
          description: 'Enter your last name',
          validationMessage: 'Please enter your last name',
          span: 8,
          value: '',
        },

        {
          title: 'Phone number',
          label: 'Phone number',
          name: 'phone',
          type: 'text',
          isRequired: false,
          description: 'Enter phone number',
          validationMessage: 'Please fill phone number',
          span: 8,
          value: '',
        },
      ],
    },
  ],
};

const userRolesPermissions: Form = {
  submitButtonText: 'Update Role',
  groups: [
    {
      title: 'User Role',
      fields: [
        {
          value: '',
          name: 'roleId',
          title: 'User Role',
          label: 'User Role',
          description: 'select user role',
          type: 'select',
          validationMessage: 'please enter value',
          isRequired: true,
          options: [],
          span: 24,
        },
      ],
    },
  ],
};

const userFilter: Form = {
  groups: [
    {
      fields: [
        {
          title: '',
          label: 'First name',
          name: 'firstName',
          type: 'text',
          isRequired: false,
          description: 'First name',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: '',
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          isRequired: false,
          description: 'Last name',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          value: '',
          title: '',
          name: 'gender',
          label: 'Gender',
          description: 'Gender',
          type: 'select',
          validationMessage: 'please enter value',
          isRequired: false,
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          span: 24,
        },
        {
          value: '',
          title: '',
          label: 'Date Registered',
          name: 'createdAt',
          description: 'Enter date',
          type: 'date',
          validationMessage: 'please enter date',
          isRequired: false,
          span: 24,
        },
      ],
    },
  ],
};

export const userForms = {
  changeUserPassword,
  userProfile,
  userRolesPermissions,
  userProfileEdit,
  userFilter,
  updateUserPassword,
};
