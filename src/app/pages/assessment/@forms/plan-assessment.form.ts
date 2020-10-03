import { Form } from '@shared/components/field-generator/formt';

export const planAssessmentForm: Form = {
  submitButtonText: 'Plan',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'patientId',
          title: 'Select a patient',
          label: 'Select a patient',
          description: 'Search and Select a patient',
          type: 'select',
          validationMessage: 'please enter first name',
          isRequired: true,
          span: 24,
          options: [{ label: 'Edgar Emmanuel', value: 1 }],
        },
        {
          value: '',
          name: 'clinicianId',
          title: 'Select a clinician',
          label: 'Select a clinician',
          description: 'Search and Select a clinician',
          type: 'select',
          validationMessage: 'please select clinician',
          isRequired: true,
          span: 24,
          options: [{ label: 'Eric Maro', value: 1 }],
        },
        {
          value: '',
          name: 'informantId',
          title: 'Select a informant',
          label: 'Select a informant',
          description: 'Search and Select an informant',
          type: 'select',
          validationMessage: 'please select clinician',
          isRequired: false,
          span: 24,
          options: [{ label: 'Eric Maro', value: 1 }],
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
