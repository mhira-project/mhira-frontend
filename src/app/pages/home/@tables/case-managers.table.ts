const actions: any[] = [
  {
    type: 'Delete',
    name: 'Remove Case Manager',
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
    title: 'Work ID',
    name: 'workID',
    isFilterable: true,
  },
  {
    title: 'Phone',
    name: 'phone',
    isFilterable: false,
  },
  {
    title: 'Username',
    name: 'username',
    isFilterable: false,
  },
  {
    title: 'Roles',
    name: 'formattedRoles',
    isFilterable: false,
  },
  {
    title: 'Active',
    name: 'formattedActive',
    isFilterable: false,
  },
  {
    title: 'Departments',
    name: 'formattedDepartments',
    isFilterable: false,
  },
];

export const CaseManagersTable = {
  actions,
  columns,
};
