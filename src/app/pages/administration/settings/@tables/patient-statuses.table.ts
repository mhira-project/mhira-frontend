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
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Description',
    name: 'description',
    isFilterable: false,
    sort: true,
  },
  {
    title: 'Created Date',
    name: 'formattedCreatedAt',
    isFilterable: false,
  },
  {
    title: 'Updated Date',
    name: 'formattedUpdatedAt',
    isFilterable: false,
  },
];

export const PatientStatusesTable = {
  actions,
  columns,
};
