import gql from 'graphql-tag';

const createOneRole = gql`
  mutation($input: CreateOneRoleInput!) {
    createOneRole(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
    }
  }
`;

const createManyRoles = gql`
  mutation($input: CreateManyRolesInput!) {
    createManyRoles(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
    }
  }
`;

const updateOneRole = gql`
  mutation($input: UpdateOneRoleInput!) {
    updateOneRole(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
    }
  }
`;

const updateManyRoles = gql`
  mutation($input: UpdateManyRolesInput!) {
    updateManyRoles(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
    }
  }
`;

const deleteOneRole = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneRole(input: $input) {
      id
      name
      guard
      createdAt
      updatedAt
    }
  }
`;

const deleteManyRoles = gql`
  mutation($input: DeleteManyRolesInput!) {
    deleteManyRoles(input: $input) {
      deletedCount
    }
  }
`;

const setRolesOnUser = gql`
  mutation($input: RelationInput!) {
    setRolesOnUser(input: $input) {
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

const removeUsersFromRole = gql`
  mutation($input: RelationInput!) {
    removeUsersFromRole(input: $input) {
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

const removePermissionsFromRole = gql`
  mutation($input: RelationsInput!) {
    removePermissionsFromRole(input: $input) {
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

const setUsersOnRole = gql`
  mutation($input: RelationInput!) {
    setUsersOnRole(input: $input) {
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

const addPermissionsToRole = gql`
  mutation($input: RelationsInput!) {
    addPermissionsToRole(input: $input) {
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

const addUsersToRole = gql`
  mutation($input: RelationsInput!) {
    addUsersToRole(input: $input) {
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

const addRolesToUser = gql`
  mutation($input: RelationsInput!) {
    addRolesToUser(input: $input) {
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

const removeRolesFromUser = gql`
  mutation($input: RelationsInput!) {
    removeRolesFromUser(input: $input) {
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

export const RolesMutations = {
  createOneRole,
  createManyRoles,
  updateOneRole,
  updateManyRoles,
  deleteOneRole,
  deleteManyRoles,
  setRolesOnUser,
  removeUsersFromRole,
  removePermissionsFromRole,
  setUsersOnRole,
  addPermissionsToRole,
  addUsersToRole,
  addRolesToUser,
  addDepartmentsToUser,
  removeRolesFromUser,
  removeDepartmentsFromUser,
};
