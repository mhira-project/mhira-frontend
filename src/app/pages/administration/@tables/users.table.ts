const actions: any[] = [
  {
    type: 'delete',
    name: 'Delete User',
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
    name: 'roles',
    isFilterable: false,
  },
  {
    title: 'Active',
    name: 'active',
    isFilterable: false,
  },
  {
    title: 'Departments',
    name: 'departments',
    isFilterable: false,
  },
];

export const userTable = {
  actions,
  columns,
};
