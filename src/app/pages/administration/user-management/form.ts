import { FormItemType } from '../../../@shared/components/form-generator/form-item.type';
import { FieldGroup } from '@shared/components/field-generator/field.group';

const createUser: FormItemType[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your full name',
    validationMessage: 'Enter your full name',
    fillPercent: 50,
  },
  {
    name: 'email',
    label: 'Your Email',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Email',
    validationMessage: 'Enter your Email',
    fillPercent: 50,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Address',
    validationMessage: 'Enter your Address',
    fillPercent: 100,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    pattern: '',
    isRequired: true,
    description: 'Enter your Password',
    validationMessage: 'Enter your Password',
    fillPercent: 100,
  },
];

const updateUser: FormItemType[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your full name',
    validationMessage: 'Enter your full name',
    fillPercent: 50,
  },
  {
    name: 'email',
    label: 'Your Email',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Email',
    validationMessage: 'Enter your Email',
    fillPercent: 50,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Address',
    validationMessage: 'Enter your Address',
    fillPercent: 100,
  },
];

const changeUserPassword: FieldGroup[] = [
  {
    title: '',
    fields: [
      {
        title: 'Enter New Password',
        label: 'New Password',
        type: 'password',
        isRequired: true,
        description: 'Enter new password',
        validationMessage: '',
        span: 24,
        value: '',
      },
    ],
  },
];

const userProfile: FieldGroup[] = [
  {
    title: 'Personal Information',
    fields: [
      {
        title: 'First Name',
        label: 'First name',
        type: 'text',
        isRequired: true,
        description: 'Enter your first name',
        validationMessage: '',
        span: 6,
        value: '',
      },
      {
        title: 'First Name',
        label: 'First name',
        type: 'text',
        isRequired: true,
        description: 'Enter your first name',
        validationMessage: '',
        span: 6,
        value: '',
      },
      {
        title: 'First Name',
        label: 'First name',
        type: 'text',
        isRequired: true,
        description: 'Enter your first name',
        validationMessage: '',
        span: 6,
        value: '',
      },
      {
        title: 'First Name',
        label: 'First name',
        type: 'text',
        isRequired: true,
        description: 'Enter your first name',
        validationMessage: '',
        span: 6,
        value: '',
      },
    ],
  },
];

export const form = {
  createUser,
  updateUser,
  changeUserPassword,
  userProfile
};
