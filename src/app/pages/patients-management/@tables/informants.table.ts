const actions: any[] = [
  {
    type: 'Edit Informant',
    name: 'Edit Informant',
  },
  {
    type: 'Delete Informant',
    name: 'Delete Informant',
  },
];

const columns: any[] = [
  {
    title: 'First Name',
    name: 'firstName',
    isFilterable: false,
  },
  {
    title: 'Middle Name',
    name: 'middleName',
    isFilterable: false,
  },
  {
    title: 'Last Name',
    name: 'lastName',
    isFilterable: false,
  },
  {
    title: 'Phone',
    name: 'phone',
    isFilterable: false,
  },
  {
    title: 'Email',
    name: 'email',
    isFilterable: false,
  },
  {
    title: 'Address',
    name: 'address',
    isFilterable: false,
  },
  {
    title: 'Patient',
    name: 'patientNames',
    isFilterable: false,
  },
  {
    title: 'Relationship Type',
    name: 'formattedRelationshipType',
    isFilterable: false,
  },
  {
    title: 'Created At',
    name: 'formattedCreatedAt',
    isFilterable: false,
  },
];

export const InformantsTable = {
  actions,
  columns,
};
