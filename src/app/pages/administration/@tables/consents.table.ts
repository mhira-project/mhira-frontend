const columns: any[] = [
  {
    title: 'tables.consents.name',
    name: 'name',
    translationPath: 'tables.consents.name',
    sort: true,
    isFilterable: true,
    filterField: {
      type: 'text',
      value: undefined,
    },
  },
  {
    title: 'tables.consents.description',
    name: 'description',
    sort: true,
    translationPath: 'tables.consents.description',
    isFilterable: false,
  },
  {
    title: 'tables.consents.createdAt',
    name: 'createdAt',
    sort: true,
    translationPath: 'tables.consents.createdAt',
    isFilterable: false,
  },
];

export const ConsentsTable = {
  columns,
};
