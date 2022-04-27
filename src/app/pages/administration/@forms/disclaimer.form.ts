import { Form } from '../../../@shared/components/form/@types/form';

export const DisclaimerForm: Form = {
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'description',
          title: 'Description',
          label: 'Description',
          translationPath: 'tables.disclaimer.textInformation',
          description: 'Enter description',
          type: 'textArea',
          validationMessage: 'Please enter description',
          isRequired: false,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
