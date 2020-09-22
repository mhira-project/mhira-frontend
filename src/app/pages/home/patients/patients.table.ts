const actions: any[] = [
  {
    type: 'Plan Assessment',
    name: 'Plan Assessment',
  },
  {
    type: 'Edit Patient',
    name: 'Edit Patient',
  },
];

const columns: any[] = [
  {
    title: 'First name',
    name: 'firstName',
    isFilterable: false,
  },
  {
    title: 'Last name',
    name: 'lastName',
    isFilterable: false,
  },
  {
    title: 'Date of Birth',
    name: 'birthDate',
    isFilterable: false,
  },
  {
    title: 'Status',
    name: 'active',
    isFilterable: false,
  },
  {
    title: 'Modified Date',
    name: 'updatedAt',
    isFilterable: false,
  },
];

export const table = {
  actions,
  columns,
};
