const actions: any[] = [
  {
    type: 'Delete Assessment',
    name: 'Delete Assessment',
  },
  {
    type: 'View Results',
    name: 'View Results',
  },
  {
    type: 'Go to Report',
    name: 'Go to Report',
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
    title: 'Hospital ID',
    name: 'hospitalId',
    isFilterable: false,
  },
  {
    title: 'Responsible Clinician',
    name: 'clinician',
    isFilterable: false,
  },
  {
    title: 'Planned Date',
    name: 'plannedDate',
    isFilterable: false,
  },
  {
    title: 'Status',
    name: 'active',
    isFilterable: false,
  },
  {
    title: 'First Visit',
    name: 'firstVisit',
    isFilterable: false,
  },
];

export const assessmentTable = {
  actions,
  columns,
};
