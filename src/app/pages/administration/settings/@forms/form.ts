import { Form } from '../../../../@shared/components/form/@types/form';
import { Setting } from '../../@types/setting';

const general: Form & { groups: { fields: { name: keyof Setting }[] }[] } = {
  submitButtonText: 'Save',
  groups: [
    {
      fields: [
        {
          title: 'Set system locale',
          name: 'systemLocale',
          translationPath: 'form.system.systemLocale',
          type: 'select',
          options: [],
          isRequired: false,
          description: 'Set system locale',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Set system time zone',
          name: 'systemTimezone',
          translationPath: 'form.system.systemTimezone',
          type: 'select',
          options: [],
          isRequired: false,
          description: 'Set system time zone',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Set date format',
          name: 'dateFormat',
          translationPath: 'form.system.dateFormat',
          type: 'select',
          options: [],
          isRequired: false,
          description: 'Set date format',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Set time format',
          name: 'timeFormat',
          translationPath: 'form.system.timeFormat',
          type: 'select',
          options: [],
          isRequired: false,
          description: 'Set time format',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Password life time (In Days)',
          name: 'passwordLifeTimeInDays',
          translationPath: 'form.system.passwordLifeTimeInDays',
          type: 'number',
          isRequired: false,
          description: 'Set password life time',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Password re-use cut off(In Days)',
          name: 'passwordReUseCutoffInDays',
          translationPath: 'form.system.passwordReUseCutoffInDays',
          type: 'number',
          isRequired: false,
          description: 'Set password re-use cut off',
          validationMessage: '',
          span: 8,
          value: '',
        },
        {
          title: 'Max login attempts',
          name: 'maxLoginAttempts',
          translationPath: 'form.system.maxLoginAttempts',
          type: 'number',
          isRequired: false,
          description: 'Set the number of max login attempts',
          validationMessage: '',
          span: 8,
          value: undefined,
        },
      ],
    },
  ],
};

export const settingsForms = {
  general,
};
