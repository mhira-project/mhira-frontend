import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedPatient } from '../@types/formatted-patient';
import { CaseManager } from '../@types/case-manager';

export const PatientColumns: TableColumn<FormattedPatient>[] = [
  {
    title: 'First name',
    name: 'firstName',
    translationPath: 'tables.patients.firstName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Middle name',
    name: 'middleName',
    translationPath: 'tables.patients.middleName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Last name',
    name: 'lastName',
    translationPath: 'tables.patients.lastName',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Hospital ID',
    name: 'medicalRecordNo',
    translationPath: 'tables.patients.medicalRecordNo',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'Gender',
    name: 'gender',
    translationPath: 'tables.patients.gender',
    sort: true,
    filterField: {
      type: 'radio',
      value: undefined,
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    title: 'Date of Birth',
    name: 'birthDate',
    translationPath: 'tables.patients.birthDate',
    render: 'date',
    sort: true,
    filterField: {
      type: 'date',
      value: undefined,
      title: 'Date of Birth',
    },
  },
  {
    title: 'Status',
    name: 'formattedStatus',
    translationPath: 'tables.patients.status',
    altName: 'statusId',
    render: 'tag',
    sort: true,
    filterField: {
      type: 'select',
      value: undefined,
      // options added dynamically
    },
  },
  {
    title: 'Informants',
    name: 'formattedInformants',
    translationPath: 'tables.patients.informants',
    render: 'avatar',
  },
  {
    title: 'Case Manager',
    name: 'formattedCaseManagers',
    translationPath: 'tables.patients.caseManager',
    altName: 'caseManagers',
    render: 'avatar',
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
            ] as Array<{ [K in keyof CaseManager]: any }>,
          }
        : {},
  },
  {
    title: 'Created Date',
    name: 'createdAt',
    translationPath: 'tables.patients.createdAt',
    render: 'date',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Created Date',
    },
  },
];
