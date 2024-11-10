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
    title: 'tables.patientStatuses.name',
    name: 'name',
    translationPath: 'tables.patientStatuses.name',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'tables.patientStatuses.description',
    name: 'description',
    translationPath: 'tables.patientStatuses.description',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'tables.patientStatuses.formattedCreatedAt',
    name: 'formattedCreatedAt',
    translationPath: 'tables.patientStatuses.formattedCreatedAt',
    isFilterable: false,
  },
  {
    title: 'forms.patientStatuses.formattedUpdatedAt',
    name: 'formattedUpdatedAt',
    translationPath: 'forms.patientStatuses.formattedUpdatedAt',
    isFilterable: false,
  },
];

export const PatientStatusesTable = {
  actions,
  columns,
};
