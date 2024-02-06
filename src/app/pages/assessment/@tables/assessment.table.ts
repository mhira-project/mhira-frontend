import { User } from './../../user-management/@types/user';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { Assessment, FormattedAssessment, QuestionnaireAssessment } from '../@types/assessment';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { environment } from '@env/environment';

export const AssessmentTable: TableColumn<FormattedAssessment>[] = [
  {
    name: 'formattedAssessmentType',
    altName: 'assessmentType',
    title: 'plannedAssessments.name',
    translationPath: 'plannedAssessments.name',
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
    name: 'patientMedicalRecordNo',
    title: 'plannedAssessments.patientMedicalRecordNo',
    translationPath: 'plannedAssessments.patientMedicalRecordNo',
    
  },
  {
    name: 'formattedPatient',
    altName: 'patient',
    title: 'plannedAssessments.formattedPatient',
    translationPath: 'plannedAssessments.formattedPatient',
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
              { medicalRecordNo: { iLike: `%${q}%` } },
            ] as Array<{ [K in keyof Patient]: any }>,
          }
        : {},
  },
  {
    name: 'formattedClinician',
    altName: 'clinician',
    title: 'plannedAssessments.formattedClinician',
    translationPath: 'plannedAssessments.formattedClinician',
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
  //   name: 'informantType',
  //   title: 'Informant',
  //   translationPath: 'plannedAssessments.informant',
  //   sort: true,
  //   filterField: {
  //     type: 'text',
  //     value: undefined,
  //   },
  // },
  {
    name: 'formatedQuestionnaires',
    title: 'Questionnaires',
    translationPath: 'plannedAssessments.questionnaires',
    render: 'questAvatar',
    // filterField: {
    //   type: 'text',
    //   value: undefined,
    // },
  },
  {
    name: 'formattedStatus',
    altName: 'status',
    title: 'Status',
    sort: true,
    translationPath: 'plannedAssessments.formattedStatus',
    render: 'tag',
  },
  // {
  //   name: 'expirationDate',
  //   title: 'Expiration Date',
  //   translationPath: 'plannedAssessments.expirationDate',
  //   render: 'date',
  //   sort: true,
  //   filterField: {
  //     type: 'dateRange',
  //     value: undefined,
  //     title: 'expirationDate',
  //   },
  // },
  {
    name: 'submissionDate',
    title: 'Submission Date',
    translationPath: 'plannedAssessments.submissionDate',
    render: 'date'
  },
  {
    name: 'emailFormatedStatus',
    altName: 'emailStatus',
    title: 'Email Status',
    translationPath: 'plannedAssessments.emailStatus',
    render: 'tag',
    sort: true
  },
  {
    name: 'deliveryDate',
    title: 'Delivery Date',
    translationPath: 'plannedAssessments.deliveryDate',
    render: 'date',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'deliveryDate',
    },
  },
];

if(!environment.email){
  AssessmentTable.pop();
}