import { User } from './../../user-management/@types/user';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedAssessment } from '../@types/assessment';
import { Patient } from '@app/pages/patients-management/@types/patient';

export const AssessmentTable: TableColumn<FormattedAssessment>[] = [
  {
    name: 'formattedAssessmentType',
    title: 'Name',
    translationPath: 'plannedAssessments.name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    name: 'patientMedicalRecordNo',
    title: 'Patient Hospital ID',
    translationPath: 'plannedAssessments.patientMedicalRecordNo',
  },
  {
    name: 'formattedPatient',
    altName: 'patient',
    title: 'Patient',
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
  // {
  //   name: 'clinicianWorkId',
  //   title: 'Clinician Work ID',
  //   translationPath: 'plannedAssessments.clinicianWorkId',
  // },
  {
    name: 'updatedAt',
    title: 'Updated At',
    translationPath: 'Submission Date',
    render: 'date'
  },
  {
    name: 'formattedClinician',
    altName: 'clinician',
    title: 'Clinician',
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
  {
    name: 'informantType',
    title: 'Informant',
    translationPath: 'plannedAssessments.informant',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    name: 'deliveryDate',
    title: 'Delivery Date',
    translationPath: 'plannedAssessments.deliveryDate',
    render: 'date',
    sort: false,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'deliveryDate',
    },
  },
  {
    name: 'expirationDate',
    title: 'Expiration Date',
    translationPath: 'plannedAssessments.expirationDate',
    render: 'date',
    sort: false,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'expirationDate',
    },
  },
  {
    name: 'formattedStatus',
    title: 'Status',
    translationPath: 'plannedAssessments.formattedStatus',
    render: 'tag',
  },
  // Added this:
  {
    name: 'emailStatus',
    title: 'Email Status',
    translationPath: 'Email Status',
    render: 'emailStatus',
  },
];
