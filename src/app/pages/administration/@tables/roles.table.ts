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
    title: 'tables.roles.name',
    name: 'name',
    translationPath: 'tables.roles.name',
    sort: true,
    isFilterable: false,
  },
  {
    title: 'tables.roles.hierarchy',
    name: 'hierarchy',
    sort: true,
    translationPath: 'tables.roles.hierarchy',
    isFilterable: false,
  },
  {
    title: 'tables.roles.createdAt',
    name: 'createdAt',
    sort: true,
    translationPath: 'tables.roles.createdAt',
    isFilterable: false,
  },
];

export const RolesTable = {
  actions,
  columns,
};
