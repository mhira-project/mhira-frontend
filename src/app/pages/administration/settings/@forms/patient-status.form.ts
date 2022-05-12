import { Form } from '../../../../@shared/components/form/@types/form';

export const PatientStatusForm: Form = {
  submitButtonText: 'Submit PatientStatus',
  editButtonText: 'Submit PatientStatus',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'PatientStatus Name',
          label: 'PatientStatus Name',
          description: 'enter company name',
          translationPath: 'forms.patientStatuses.name',
          type: 'text',
          validationMessage: 'please enter  company name',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'description',
          title: 'PatientStatus Description',
          label: 'PatientStatus Description',
          translationPath: 'forms.patientStatuses.description',
          description: 'enter Description',
          type: 'text',
          validationMessage: 'please enter  Description',
          isRequired: false,
          span: 24,
          options: [],
        },
      ],
    },
  ],
};
