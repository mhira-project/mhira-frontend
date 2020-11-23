const actions: any[] = [
  {
    type: 'Edit Department',
    name: 'Edit Department',
  },
  {
    type: 'Delete Department',
    name: 'Delete Department',
  },
];

const columns: any[] = [
  {
    title: 'Department Name',
    name: 'name',
    isFilterable: false,
  },
  {
    title: 'Created At',
    name: 'createdAt',
    isFilterable: false,
  },
];

export const DepartmentsTable = {
  actions,
  columns,
};
