import gql from 'graphql-tag';

const removePermissionsFromUser = gql`
  mutation($input: RemovePermissionsFromUserInput!) {
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
  mutation($input: SetPermissionsOnUserInput!) {
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

export const PermissionsMutations = {
  removePermissionsFromUser,
  setPermissionsOnUser,
};
