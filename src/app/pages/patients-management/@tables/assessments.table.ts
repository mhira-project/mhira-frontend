import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Assessment, FormattedAssessment } from '@app/pages/assessment/@types/assessment';
import { environment } from '@env/environment';
import { User } from '@app/pages/user-management/@types/user';

export const AssessmentsPatientsTable: TableColumn<FormattedAssessment>[] = [
  {
    title: 'Title',
    name: 'formattedAssessmentType',
    altName: 'assessmentType',
    translationPath: 'tables.assessmentsPatients.title',
    // sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
    filterQuery: (q: number) =>
    q
      ? {
          or: [
            { name: { iLike: `%${q}%` } },
          ] as Array<{ [K in keyof Assessment]: any }>,
        }
      : {},
  },
  {
    title: 'Manager',
    name: 'formattedClinician',
    altName: 'clinician',
    translationPath: 'tables.assessmentsPatients.manager',
    sort: false,
    filterField: {
      type: 'text',
      value: undefined,
    },
    filterQuery: (q: number) =>
    q
      ? {
          or: [
            { firstName: { iLike: `%${q}%` } },
            { middleName: { iLike: `%${q}%` } },
            { lastName: { iLike: `%${q}%` } },
            { workID: { iLike: `%${q}%` } },
          ] as Array<{ [K in keyof User]: any }>,
        }
      : {},
  },
  // {
  //   title: 'Informants',
  //   name: 'informantType',
  //   translationPath: 'tables.assessmentsPatients.informant',
  //   sort: true,
  //   filterField: {
  //     type: 'text',
  //     value: undefined,
  //   },
  // },
  {
    name: 'formatedQuestionnaires',
    title: 'Questionnaires',
    render: 'questAvatar',
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    altName: 'status',
    translationPath: 'tables.assessmentsPatients.status',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      // options added dynamically
    },
  },
  // {
  //   title: 'Expiration Date',
  //   altName: 'expirationDate',
  //   name: 'formatedExpirationDate',
  //   translationPath: 'tables.assessmentsPatients.expirationDate',
  //   sort: true,
  //   filterField: {
  //     type: 'dateRange',
  //     value: undefined,
  //     title: 'Expiration Date',
  //   },
  // },
  {
    name: 'submissionDate',
    title: 'Submission Date',
    translationPath: 'plannedAssessments.submissionDate',
    render: 'date'
  },
  {
    title: 'Email Status',
    name: 'emailFormatedStatus',
    altName: 'emailStatus',
    render: 'tag',
    translationPath: 'tables.assessmentsPatients.emailStatus',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Delivery Date',
    name: 'formatedDeliveryDate',
    altName: 'deliveryDate',
    translationPath: 'tables.assessmentsPatients.deliveryDate',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Delivery Date',
    },
  },
];

if(!environment.email){
  AssessmentsPatientsTable.pop();
}
