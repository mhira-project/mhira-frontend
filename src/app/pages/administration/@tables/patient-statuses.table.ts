const actions: any[] = [
  {
    type: 'Edit PatientStatus',
    name: 'Edit PatientStatus',
  },
  {
    type: 'Delete PatientStatus',
    name: 'Delete PatientStatus',
  },
];

const columns: any[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'tables.patientStatuses.name',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Description',
    name: 'description',
    translationPath: 'tables.patientStatuses.description',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Created Date',
    name: 'formattedCreatedAt',
    translationPath: 'tables.patientStatuses.formattedCreatedAt',
    isFilterable: false,
  },
  {
    title: 'Updated Date',
    name: 'formattedUpdatedAt',
    translationPath: 'tables.patientStatuses.formattedUpdatedAt',
    isFilterable: false,
  },
];

export const PatientStatusesTable = {
  actions,
  columns,
};
