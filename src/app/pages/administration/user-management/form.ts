import { FormItemType } from '../../../@shared/components/form-generator/form-item.type';


const createUser: FormItemType[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your full name',
    validationMessage: 'Enter your full name',
    fillPercent: 50
  },
  {
    name: 'email',
    label: 'Your Email',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Email',
    validationMessage: 'Enter your Email',
    fillPercent: 50
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Address',
    validationMessage: 'Enter your Address',
    fillPercent: 100
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    pattern: '',
    isRequired: true,
    description: 'Enter your Password',
    validationMessage: 'Enter your Password',
    fillPercent: 100
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
    fillPercent: 50
  },
  {
    name: 'email',
    label: 'Your Email',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Email',
    validationMessage: 'Enter your Email',
    fillPercent: 50
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    pattern: '',
    isRequired: true,
    description: 'Enter your Address',
    validationMessage: 'Enter your Address',
    fillPercent: 100
  },
];

const changeUserPassword: FormItemType[] = [
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    pattern: '',
    isRequired: true,
    description: 'Enter new password',
    validationMessage: 'Enter new password',
    fillPercent: 100
  },
];

export const form = {
  createUser,
  updateUser,
  changeUserPassword
};
