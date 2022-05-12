const actions: any[] = [
  {
    type: 'Edit PatientStatus',
    name: 'Edit PatientStatus',
    translationPath: 'tables.patientStatus.editPatient',
  },
  {
    type: 'Delete PatientStatus',
    name: 'Delete PatientStatus',
    translationPath: 'tables.patientStatus.deletePatient',
  },
];

const columns: any[] = [
  {
    title: 'Name',
    name: 'name',
    translationPath: 'tables.patientStatus.name',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Description',
    name: 'description',
    translationPath: 'tables.patientStatus.description',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Created Date',
    name: 'formattedCreatedAt',
    translationPath: 'tables.patientStatus.formattedCreatedAt',
    isFilterable: false,
  },
  {
    title: 'Updated Date',
    name: 'formattedUpdatedAt',
    translationPath: 'tables.patientStatus.formattedUpdatedAt',
    isFilterable: false,
  },
];

export const PatientStatusesTable = {
  actions,
  columns,
};
