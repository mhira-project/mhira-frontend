const actions: any[] = [
  {
    type: 'changePassword',
    name: 'Change Password',
  },
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
    title: 'Email',
    name: 'email',
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
    title: 'Gender',
    name: 'gender',
    isFilterable: false,
  },
  {
    title: 'Birdth Date',
    name: 'birthDate',
    isFilterable: false,
  },
];

export const userTable = {
  actions,
  columns,
};
