const actions: any[] = [
  {
    type: 'Plan Assessment',
    name: 'Plan Assessment',
  },
  {
    type: 'Delete Patient',
    name: 'Delete Patient',
  },
];

const columns: any[] = [
  {
    title: 'First name',
    name: 'firstName',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Last name',
    name: 'lastName',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Hospital ID',
    name: 'medicalRecordNo',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Gender',
    name: 'gender',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Date of Birth',
    name: 'formattedBirthDate',
    isFilterable: false,
  },
  {
    title: 'Status',
    name: 'formattedActive',
    isFilterable: false,
  },
  {
    title: 'Informants',
    name: 'formattedInformants',
    isFilterable: false,
  },
  {
    title: 'Case Manager',
    name: 'formattedCaseManagers',
    isFilterable: false,
  },
  {
    title: 'Created Date',
    name: 'formattedCreatedAt',
    isFilterable: false,
  },
];

export const table = {
  actions,
  columns,
};
