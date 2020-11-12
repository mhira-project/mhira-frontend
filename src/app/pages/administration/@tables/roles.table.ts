const actions: any[] = [
  {
    type: 'Edit Role',
    name: 'Edit Role',
  },
  {
    type: 'Delete Role',
    name: 'Delete Role',
  },
];

const columns: any[] = [
  {
    title: 'Role Name',
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

export const RolesTable = {
  actions,
  columns,
};
