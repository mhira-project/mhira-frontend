import gql from 'graphql-tag';

const createOneRole = gql`
  query($input: CreateOneRoleInput!) {
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
  query($input: CreateManyRolesInput!) {
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
  query($input: UpdateOneRoleInput!) {
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
  query($input: UpdateManyRolesInput!) {
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
  query($input: DeleteOneInput!) {
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
  query($input: DeleteManyRolesInput!) {
    deleteManyRoles(input: $input) {
      deletedCount
    }
  }
`;

const removeRolesFromUser = gql`
  query($input: RelationInput!) {
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

const setRolesOnUser = gql`
  query($input: RelationInput!) {
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
  query($input: RelationInput!) {
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
  query($input: RelationInput!) {
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
  query($input: RelationInput!) {
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

const setPermissionsOnRole = gql`
  query($input: RelationInput!) {
    setPermissionsOnRole(input: $input) {
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

export const RolesMutations = {
  createOneRole,
  createManyRoles,
  updateOneRole,
  updateManyRoles,
  deleteOneRole,
  deleteManyRoles,
  removeRolesFromUser,
  setRolesOnUser,
  removeUsersFromRole,
  removePermissionsFromRole,
  setUsersOnRole,
  setPermissionsOnRole,
};
