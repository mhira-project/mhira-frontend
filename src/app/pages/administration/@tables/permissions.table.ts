const actions: any[] = [];

const columns: any[] = [
  {
    title: 'Permission Name',
    name: 'name',
    translationPath: 'tables.permission.name',
    isFilterable: false,
  },
  {
    title: 'Created At',
    name: 'createdAt',
    translationPath: 'tables.permission.name',
    isFilterable: false,
  },
];

export const PermissionsTable = {
  actions,
  columns,
};
