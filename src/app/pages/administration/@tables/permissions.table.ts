const actions: any[] = [];

const columns: any[] = [
  {
    title: 'Permission Name',
    name: 'name',
    isFilterable: false,
  },
  {
    title: 'Guard Name',
    name: 'guard',
    isFilterable: false,
  },
  {
    title: 'Created At',
    name: 'createdAt',
    isFilterable: false,
  },
];

export const PermissionsTable = {
  actions,
  columns,
};
