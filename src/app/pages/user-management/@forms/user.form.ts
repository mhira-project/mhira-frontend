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
          translationPath: 'forms.changePassword.newPassword',
          type: 'password',
          isRequired: true,
          description: 'forms.changePassword.newPassword',
          validationMessage: '',
          span: 24,
          value: '',
          minLength: 6,
        },
        {
          title: 'Repeat Password',
          name: 'newPasswordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          translationPath: 'forms.changePassword.newPasswordConfirmation',
          isRequired: true,
          description: 'forms.changePassword.newPasswordConfirmation',
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
          translationPath: 'forms.changeUserPassword.currentPassword',
          isRequired: true,
          description: 'forms.changeUserPassword.currentPassword',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: 'Enter New Password',
          name: 'newPassword',
          label: 'New Password',
          type: 'password',
          translationPath: 'forms.changeUserPassword.newPassword',
          isRequired: true,
          description: 'forms.changeUserPassword.newPassword',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: 'Repeat Password',
          name: 'newPasswordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          translationPath: 'forms.changeUserPassword.newPasswordConfirmation',
          isRequired: true,
          description: 'forms.changeUserPassword.newPasswordConfirmation',
          validationMessage: '',
          span: 24,
          value: '',
        },
      ],
    },
  ],
};

const userProfile: Form = {
  submitButtonText: 'forms.userProfile.saveUser',
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
          translationPath: 'forms.userProfile.username',
          isRequired: true,
          description: 'forms.userProfile.descriptionUserName',
          validationMessage: 'forms.userProfile.validationUserName',
          span: 12,
          value: '',
        },
        {
          title: 'ID',
          label: 'ID',
          name: 'workID',
          type: 'text',
          translationPath: 'forms.userProfile.workID',
          isRequired: true,
          description: 'forms.userProfile.descriptionId',
          validationMessage: 'forms.userProfile.validationId',
          span: 12,
          value: '',
        },
        {
          title: 'Email',
          label: 'Email',
          name: 'email',
          translationPath: 'forms.userProfile.email',
          type: 'text',
          isRequired: false,
          description: 'forms.userProfile.descriptionEmail',
          validationMessage: 'forms.userProfile.validationEmail',
          span: 24,
          value: '',
        },
        {
          title: 'First Name',
          label: 'First name',
          name: 'firstName',
          type: 'text',
          translationPath: 'forms.userProfile.firstName',
          isRequired: true,
          description: 'forms.userProfile.descriptionFirstName',
          validationMessage: 'forms.userProfile.validationFirstName',
          span: 8,
          value: '',
        },
        {
          title: 'Middle Name',
          label: 'Middle name',
          name: 'middleName',
          type: 'text',
          translationPath: 'forms.userProfile.middleName',
          isRequired: false,
          description: 'forms.userProfile.descriptionMiddleName',
          validationMessage: 'forms.userProfile.validationMiddleName',
          span: 8,
          value: '',
        },
        {
          title: 'Last Name',
          label: 'Last name',
          name: 'lastName',
          type: 'text',
          translationPath: 'forms.userProfile.lastName',
          isRequired: true,
          description: 'forms.userProfile.descriptionLastName',
          validationMessage: 'forms.userProfile.validationLastName',
          span: 8,
          value: '',
        },

        {
          title: 'Phone number',
          label: 'Phone number',
          name: 'phone',
          type: 'text',
          translationPath: 'forms.userProfile.phone',
          isRequired: false,
          description: 'forms.userProfile.descriptionPhone',
          validationMessage: 'forms.userProfile.validationPhone',
          span: 8,
          value: '',
        },

        {
          title: 'Password',
          label: 'Password',
          name: 'password',
          type: 'password',
          translationPath: 'forms.userProfile.password',
          isRequired: true,
          description: 'forms.userProfile.descriptionPass',
          validationMessage: 'forms.userProfile.descriptionPass',
          span: 8,
          value: '',
          minLength: 6,
        },
        {
          title: 'Repeat Password',
          name: 'passwordConfirmation',
          label: 'Repeat Password',
          type: 'password',
          translationPath: 'forms.userProfile.passwordConfirmation',
          isRequired: true,
          description: 'forms.userProfile.descriptionRepeatPass',
          validationMessage: 'forms.userProfile.descriptionRepeatPass',
          span: 8,
          value: '',
        },
      ],
    },
  ],
};

const userProfileEdit: Form = {
  submitButtonText: 'forms.userProfileEdit.saveUser',
  editButtonText: 'forms.userProfileEdit.editUser',
  submitButtonClass: 'right-align-submit',
  groups: [
    {
      title: 'Personal Information',
      fields: [
        {
          title: 'Login Username',
          label: 'Username',
          name: 'username',
          translationPath: 'forms.userProfileEdit.username',
          type: 'text',
          isRequired: true,
          description: 'forms.userProfileEdit.descriptionUsername',
          validationMessage: 'forms.userProfileEdit.validationUsername',
          span: 12,
          value: '',
        },
        {
          title: 'ID',
          label: 'ID',
          name: 'workID',
          translationPath: 'forms.userProfileEdit.workID',
          type: 'text',
          isRequired: true,
          description: 'forms.userProfileEdit.descriptionId',
          validationMessage: 'forms.userProfileEdit.validationMessage',
          span: 12,
          value: '',
        },
        {
          title: 'Email',
          label: 'Email',
          name: 'email',
          translationPath: 'forms.userProfileEdit.email',
          type: 'text',
          isRequired: false,
          description: 'forms.userProfileEdit.descriptionEmail',
          validationMessage: 'forms.userProfileEdit.validationEmail',
          span: 24,
          value: '',
        },
        {
          title: 'First Name',
          label: 'First name',
          name: 'firstName',
          translationPath: 'forms.userProfileEdit.firstName',
          type: 'text',
          isRequired: true,
          description: 'forms.userProfileEdit.descriptionFirstName',
          validationMessage: 'forms.userProfileEdit.validationFirstName',
          span: 8,
          value: '',
        },
        {
          title: 'Middle Name',
          label: 'Middle name',
          name: 'middleName',
          translationPath: 'forms.userProfileEdit.middleName',
          type: 'text',
          isRequired: false,
          description: 'forms.userProfileEdit.descriptionMiddleName',
          validationMessage: 'forms.userProfileEdit.validationMiddleName',
          span: 8,
          value: '',
        },
        {
          title: 'Last Name',
          label: 'Last name',
          name: 'lastName',
          translationPath: 'forms.userProfileEdit.lastName',
          type: 'text',
          isRequired: true,
          description: 'forms.userProfileEdit.descriptionLastName',
          validationMessage: 'forms.userProfileEdit.validationLastName',
          span: 8,
          value: '',
        },

        {
          title: 'Phone number',
          label: 'Phone number',
          name: 'phone',
          translationPath: 'forms.userProfileEdit.phone',
          type: 'text',
          isRequired: false,
          description: 'forms.userProfileEdit.descriptionPhone',
          validationMessage: 'forms.userProfileEdit.validationPhone',
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
          translationPath: 'forms.userRolesPermissions.roleId',
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

export const userForms = {
  changeUserPassword,
  userProfile,
  userRolesPermissions,
  userProfileEdit,
  updateUserPassword,
};
