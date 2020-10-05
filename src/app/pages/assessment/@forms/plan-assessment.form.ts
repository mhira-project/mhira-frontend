import { Form } from '@shared/components/field-generator/formt';

export const planAssessmentForm: Form = {
  submitButtonText: 'Plan',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: null,
          name: 'patientId',
          title: 'Select a patient',
          label: 'Select a patient',
          description: 'Search and Select a patient',
          type: 'search',
          validationMessage: 'please enter first name',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'clinicianId',
          title: 'Select a clinician',
          label: 'Select a clinician',
          description: 'Search and Select a clinician',
          type: 'search',
          validationMessage: 'please select clinician',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'informantId',
          title: 'Select a informant',
          label: 'Select a informant',
          description: 'Search and Select an informant',
          type: 'search',
          validationMessage: 'please select clinician',
          isRequired: false,
          span: 24,
          options: [],
        },
        {
          value: '',
          title: 'Assessment Date',
          name: 'assessmentDate',
          label: 'Assessment Date',
          description: 'select assessment date',
          type: 'date',
          validationMessage: 'please enter date of birth',
          isRequired: false,
          span: 24,
        },
      ],
    },
  ],
};
