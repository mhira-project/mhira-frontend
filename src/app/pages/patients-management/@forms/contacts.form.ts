import { Form } from '@shared/components/form/@types/form';
import { getNames } from 'i18n-iso-countries';

export const CaregiverForm: Form = {
  submitButtonText: 'forms.patients.submitContact',
  editButtonText: 'Submit Contact',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'phone',
          title: 'Phone',
          label: 'Phone',
          translationPath: 'forms.patients.phone',
          description: 'forms.patients.descriptionContact',
          type: 'text',
          validationMessage: 'forms.patients.validationContact',
          isRequired: true,
          span: 13,
        },
        {
          value: '',
          name: 'firstName',
          title: 'First Name',
          label: 'First Name',
          translationPath: 'forms.patients.firstName',
          description: 'forms.patients.descriptionContactName',
          type: 'text',
          validationMessage: 'forms.patients.validationContactName',
          isRequired: true,
          span: 12,
        },
        {
          value: '',
          name: 'middleName',
          title: 'Middle Name',
          label: 'Middle Name',
          translationPath: 'forms.patients.middleName',
          description: 'forms.patients.descriptionMiddleName',
          type: 'text',
          validationMessage: 'forms.patients.validationMiddleName',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'lastName',
          title: 'Last Name',
          label: 'Last Name',
          translationPath: 'forms.patients.lastName',
          description: 'forms.patients.descriptionLastName',
          type: 'text',
          validationMessage: 'forms.patients.validationLastName',
          isRequired: true,
          span: 12,
        },
        {
          value: '',
          name: 'email',
          title: 'Email',
          label: 'Email',
          translationPath: 'forms.patients.email',
          description: 'forms.patients.descriptionEmail',
          type: 'text',
          validationMessage: 'forms.patients.validationEmail',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'street',
          title: 'Street',
          label: 'Street',
          translationPath: 'forms.patients.street',
          description: 'Enter contact email',
          type: 'text',
          validationMessage: 'please enter contact street',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'number',
          title: 'Number',
          label: 'Number',
          translationPath: 'forms.patients.number',
          description: 'forms.patients.descriptionContactNum',
          type: 'text',
          validationMessage: 'forms.patients.validationContactNum',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'apartment',
          title: 'Apartment',
          label: 'Apartment',
          translationPath: 'forms.patients.apartment',
          description: 'Enter contact apartment',
          type: 'text',
          validationMessage: 'please enter contact apartment',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'place',
          title: 'Place',
          label: 'Place',
          translationPath: 'forms.patients.place',
          description: 'forms.patients.descriptionPlace',
          type: 'text',
          validationMessage: 'forms.patients.validationPlace',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'postalCode',
          title: 'Postal Code',
          label: 'Postal Code',
          translationPath: 'forms.patients.postalCode',
          description: 'forms.patients.descriptionPostal',
          type: 'text',
          validationMessage: 'forms.patients.validationPostal',
          isRequired: false,
          span: 12,
        },
        {
          value: '',
          name: 'country',
          title: 'Country',
          label: 'Country',
          translationPath: 'forms.patients.country',
          description: 'forms.patients.descriptionCountry',
          type: 'select',
          validationMessage: 'forms.patients.validationCountry',
          isRequired: false,
          span: 12,
          options: Object.entries(getNames('en', { select: 'official' })).map(([value, label]) => ({ label, value })),
        },
        // {
        //   value: '',
        //   name: 'relation',
        //   title: 'Relation To Patient',
        //   label: 'Relation',
        //   translationPath: 'forms.patients.relation',
        //   description: 'Enter contact relation',
        //   type: 'select',
        //   options: [
        //     { label: 'Mother', value: 'Mother' },
        //     { label: 'Father', value: 'Father' },
        //     { label: 'Grandparent', value: 'Grandparent' },
        //     { label: 'Uncle/Aunt', value: 'Uncle/Aunt' },
        //     { label: 'Extended Family', value: 'Extended Family' },
        //     { label: 'Legal Guardian', value: 'Legal Guardian' },
        //     { label: 'Family Doctor', value: 'Family Doctor' },
        //     { label: 'External Paediatrician', value: 'External Paediatrician' },
        //     { label: 'External Psychotherapist', value: 'External Psychotherapist' },
        //     { label: 'External Psychologist', value: 'External Psychologist' },
        //     { label: 'External Social Worker', value: 'External Social Worker' },
        //     { label: 'External Nurse', value: 'External Nurse' },
        //     { label: 'Emergency Department', value: 'Emergency Department' },
        //     { label: 'Friend', value: 'Friend' },
        //     { label: 'Neighbour', value: 'Neighbour' },
        //     { label: 'Teacher', value: 'Teacher' },
        //     { label: 'School Representative', value: 'School Representative' },
        //     { label: 'Advisor', value: 'Advisor' },
        //     { label: 'Legal Advisor', value: 'Legal Advisor' },
        //     { label: 'Assistance', value: 'Assistance' },
        //     { label: 'Supervisor', value: 'Supervisor' },
        //     { label: 'Other', value: 'Other' }
        //   ],
        //   validationMessage: 'please enter contact relation',
        //   isRequired: true,
        //   span: 24
        // },
        // {
        //   value: '',
        //   name: 'emergencyContact',
        //   title: 'Emergency Contact',
        //   label: 'Emergency',
        //   translationPath: 'forms.patients.emergency',
        //   type: 'radio',
        //   options:[
        //     {label: 'Yes', value: true},
        //     {label: 'No', value: false}
        //   ],
        //   validationMessage: 'please enter contact emergency',
        //   isRequired: false,
        //   span: 24
        // },
        // {
        //   value: '',
        //   name: 'note',
        //   title: 'Note',
        //   label: 'Note',
        //   translationPath: 'forms.patients.note',
        //   description: 'Enter contact note',
        //   type: 'textArea',
        //   validationMessage: 'please enter contact emergency',
        //   isRequired: false,
        //   span: 24
        // }
      ],
    },
  ],
};
