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
    translationPath: 'tables.informants.firstName',
    isFilterable: false,
  },
  {
    title: 'Middle Name',
    name: 'middleName',
    translationPath: 'tables.informants.middleName',
    isFilterable: false,
  },
  {
    title: 'Last Name',
    name: 'lastName',
    translationPath: 'tables.informants.lastName',
    isFilterable: false,
  },
  {
    title: 'Phone',
    name: 'phone',
    translationPath: 'tables.informants.phone',
    isFilterable: false,
  },
  {
    title: 'Email',
    name: 'email',
    translationPath: 'tables.informants.email',
    isFilterable: false,
  },
  {
    title: 'Address',
    name: 'address',
    translationPath: 'tables.informants.address',
    isFilterable: false,
  },
  {
    title: 'Patient',
    name: 'patientNames',
    translationPath: 'tables.informants.patientNames',
    isFilterable: false,
  },
  {
    title: 'Relationship Type',
    name: 'formattedRelationshipType',
    translationPath: 'tables.informants.formattedRelationshipType',
    isFilterable: false,
  },
  {
    title: 'Created At',
    name: 'formattedCreatedAt',
    translationPath: 'tables.informants.formattedCreatedAt',
    isFilterable: false,
  },
];

export const InformantsTable = {
  actions,
  columns,
};
