import gql from 'graphql-tag';

const removePermissionsFromUser = gql`
  query($input: RelationInput!) {
    removePermissionsFromUser(input: $input) {
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

const setPermissionsOnUser = gql`
  query($input: RelationInput!) {
    setPermissionsOnUser(input: $input) {
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

const removeUsersFromPermission = gql`
  query($input: RelationInput!) {
    removeUsersFromPermission(input: $input) {
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

const removeRolesFromPermission = gql`
  query($input: RelationInput!) {
    removeRolesFromPermission(input: $input) {
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

const setUsersOnPermission = gql`
  query($input: RelationInput!) {
    setUsersOnPermission(input: $input) {
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

const setRolesOnPermission = gql`
  query($input: RelationInput!) {
    setRolesOnPermission(input: $input) {
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

export const PermissionsMutations = {
  removePermissionsFromUser,
  setPermissionsOnUser,
  removeUsersFromPermission,
  removeRolesFromPermission,
  setUsersOnPermission,
  setRolesOnPermission,
};
