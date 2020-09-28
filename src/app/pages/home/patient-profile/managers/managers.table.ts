const actions: any[] = [
  {
    type: 'Remove Assignment',
    name: 'Remove Assignment',
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
    title: 'Email',
    name: 'email',
    isFilterable: false,
  },
  {
    title: 'updatedAt',
    name: 'updatedAt',
    isFilterable: false,
  },
];

export const table = {
  actions,
  columns,
};
