import gql from 'graphql-tag';

const createOneDepartment = gql`
  mutation($input: CreateOneDepartmentInput!) {
    createOneDepartment(input: $input) {
      id
      name
      guard
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
      guard
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
      guard
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
      guard
      createdAt
      updatedAt
    }
  }
`;

const deleteOneDepartment = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneDepartment(input: $input) {
      id
      name
      guard
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
  mutation($input: RelationInput!) {
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

const removeUsersFromDepartment = gql`
  mutation($input: RelationInput!) {
    removeUsersFromDepartment(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
      users {
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
  }
`;

const setUsersOnDepartment = gql`
  mutation($input: RelationInput!) {
    setUsersOnDepartment(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
      users {
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
  }
`;

const addUsersToDepartment = gql`
  mutation($input: RelationsInput!) {
    addUsersToDepartment(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
      users {
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
  }
`;

const addDepartmentsToUser = gql`
  mutation($input: RelationsInput!) {
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
  mutation($input: RelationsInput!) {
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
  removeUsersFromDepartment,
  setUsersOnDepartment,
  addUsersToDepartment,
  addDepartmentsToUser,
  removeDepartmentsFromUser,
};
