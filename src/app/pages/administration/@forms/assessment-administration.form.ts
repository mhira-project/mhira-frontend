import { Form } from '@shared/components/form/@types/form';
import { AssessmentAdministrationStatus } from '../@types/assessment-administration';

export const AssessmentAdministrationForm: Form = {
  submitButtonText: 'forms.assessmentAdministration.createName',
  editButtonText: 'Edit Assessment Name',
  submitButtonClass: 'full-width',
  groups: [
    {
      fields: [
        {
          value: '',
          name: 'name',
          title: 'forms.assessmentAdministration.typeName',
          label: 'Type Name',
          description: 'forms.assessmentAdministration.typeName',
          translationPath: 'forms.assessmentAdministration.typeName',
          type: 'text',
          validationMessage: 'Please Enter Type Name',
          isRequired: true,
          span: 24,
          options: [],
        },
        {
          value: '',
          name: 'status',
          title: 'Status',
          label: 'Status',
          description: 'tables.assessmentAdministration.status',
          translationPath: 'tables.assessmentAdministration.status',
          type: 'select',
          validationMessage: '',
          isRequired: true,
          span: 24,
          options: [
            { label: AssessmentAdministrationStatus.ACTIVE, value: AssessmentAdministrationStatus.ACTIVE },
            { label: AssessmentAdministrationStatus.INACTIVE, value: AssessmentAdministrationStatus.INACTIVE },
          ],
        },
      ],
    },
  ],
};
