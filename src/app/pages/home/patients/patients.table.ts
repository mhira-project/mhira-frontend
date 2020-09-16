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
    isFilterable: true,
  },
  {
    title: 'Last name',
    name: 'lastName',
    isFilterable: true,
  },
  {
    title: 'Date of Birth',
    name: 'birthDate',
    isFilterable: true,
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
