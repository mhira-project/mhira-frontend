import { User } from './../../user-management/@types/user';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { FormattedAssessment } from '../@types/assessment';

export const AssessmentTable: TableColumn<FormattedAssessment>[] = [
  {
    name: 'name',
    title: 'Name',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    name: 'formattedPatient',
    altName: 'patient',
    title: 'Patient',
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
              { medicalRecordNo: { iLike: `%${q}%` } },
            ] as Array<{ [K in keyof User]: any }>,
          }
        : {},
  },
  {
    name: 'formattedClinician',
    altName: 'clinician',
    title: 'Clinician',
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
            ] as Array<{ [K in keyof User]: any }>,
          }
        : {},
  },
  {
    name: 'informant',
    title: 'Informant',
    sort: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    name: 'createdAt',
    title: 'Created at',
    render: 'date',
    sort: true,
    filterField: {
      type: 'dateRange',
      value: undefined,
      title: 'Created at',
    },
  },
];
