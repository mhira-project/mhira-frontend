import { Form } from '@shared/components/form/@types/form';

export const CaseManagersFilterForm: Form = {
  groups: [
    {
      fields: [
        {
          title: '',
          label: 'Search keyword',
          name: 'searchKeyword',
          type: 'text',
          isRequired: false,
          description: 'search keyword',
          validationMessage: '',
          span: 24,
          value: '',
        },
        {
          title: '',
          label: 'Patient name(s)',
          name: 'patientId',
          type: 'search',
          isRequired: false,
          description: 'search patient',
          validationMessage: '',
          span: 24,
          value: '',
          options: [],
        },
        {
          title: '',
          label: 'Case Manager name(s)',
          name: 'caseManagerId',
          type: 'search',
          isRequired: false,
          description: 'search case manager',
          validationMessage: '',
          span: 24,
          value: '',
          options: [],
        },
      ],
    },
  ],
};
