import gql from 'graphql-tag';

const createOneDepartment = gql`
  mutation($input: CreateOneDepartmentInput!) {
    createOneDepartment(input: $input) {
      id
      name
      description
      active
      createdAt
      updatedAt
    }
  }
`;

const createManyDepartments = gql`
  mutation($input: CreateManyDepartmentsInput!) {
    createManyDepartments(input: $input) {
      id
      name
      description
      active
      createdAt
      updatedAt
    }
  }
`;

const updateOneDepartment = gql`
  mutation($input: UpdateOneDepartmentInput!) {
    updateOneDepartment(input: $input) {
      id
      name
      description
      active
      createdAt
      updatedAt
    }
  }
`;

const updateManyDepartments = gql`
  mutation($input: UpdateManyDepartmentsInput!) {
    updateManyDepartments(input: $input) {
      id
      name
      description
      active
      createdAt
      updatedAt
    }
  }
`;

const deleteOneDepartment = gql`
  mutation($input: DeleteOneDepartmentInput!) {
    deleteOneDepartment(input: $input) {
      id
      name
      description
      active
      createdAt
      updatedAt
    }
  }
`;

const deleteManyDepartments = gql`
  mutation($input: DeleteManyDepartmentsInput!) {
    deleteManyDepartments(input: $input) {
      deletedCount
    }
  }
`;

const setDepartmentsOnUser = gql`
  mutation($input: SetDepartmentsOnUserInput!) {
    setDepartmentsOnUser(input: $input) {
      id
      username
      active
      firstName
      middleName
      lastName
      email
      phone
      workID
      address
      gender
      birthDate
      nationality
      createdAt
      updatedAt
    }
  }
`;

const addDepartmentsToUser = gql`
  mutation($input: AddDepartmentsToUserInput!) {
    addDepartmentsToUser(input: $input) {
      id
      username
      active
      firstName
      middleName
      lastName
      email
      phone
      workID
      address
      gender
      birthDate
      nationality
      createdAt
      updatedAt
    }
  }
`;

const removeDepartmentsFromUser = gql`
  mutation($input: RemoveDepartmentsFromUserInput!) {
    removeDepartmentsFromUser(input: $input) {
      id
      username
      active
      firstName
      middleName
      lastName
      email
      phone
      workID
      address
      gender
      birthDate
      nationality
      createdAt
      updatedAt
    }
  }
`;

export const DepartmentsMutations = {
  createOneDepartment,
  createManyDepartments,
  updateOneDepartment,
  updateManyDepartments,
  deleteOneDepartment,
  deleteManyDepartments,
  setDepartmentsOnUser,
  addDepartmentsToUser,
  removeDepartmentsFromUser,
};
