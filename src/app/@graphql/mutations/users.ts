import gql from 'graphql-tag';

const createOneUser = gql`
  mutation($createOneUserInput: CreateOneUserInput!) {
    createOneUser(input: $createOneUserInput) {
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
      deletedAt
      departments {
        id
        name
        description
        active
      }
      roles {
        id
        name
        guard
        createdAt
        updatedAt
      }
      permissions {
        id
        name
        guard
        createdAt
        updatedAt
      }
    }
  }
`;

const updateUser = gql`
  mutation(
    $workID: String
    $firstName: String!
    $middleName: String
    $lastName: String!
    $username: String!
    $phone: String
    $active: Boolean
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
    $id: Int!
  ) {
    updateUser(
      input: {
        workID: $workID
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        username: $username
        active: $active
        phone: $phone
        email: $email
        address: $address
        gender: $gender
        birthDate: $birthDate
      }
      id: $id
    ) {
      id
      workID
      firstName
      middleName
      lastName
      phone
      email
      address
      gender
      birthDate
      createdAt
      updatedAt
      deletedAt
      departments {
        name
        description
        active
      }
      roles {
        id
        name
        guard
        createdAt
        updatedAt
      }
      permissions {
        id
        name
        guard
        createdAt
        updatedAt
      }
    }
  }
`;
const changeUserPassword = gql`
  mutation($currentPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      newPasswordConfirmation: $newPasswordConfirmation
    )
  }
`;
const updateUserPassword = gql`
  mutation($newPassword: String!, $newPasswordConfirmation: String!, $id: Int!) {
    updateUserPassword(input: { newPassword: $newPassword, newPasswordConfirmation: $newPasswordConfirmation }, id: $id)
  }
`;
const deleteUser = gql`
  mutation($id: Float!) {
    deleteUser(id: $id)
  }
`;

const softDeleteUser = gql`
  mutation($id: ID!) {
    updateOneUser(input: { id: $id, update: { deleted: true } }) {
      id
      workID
      firstName
      middleName
      lastName
      phone
      email
      address
      gender
      birthDate
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UsersMutations = {
  createOneUser,
  updateUser,
  deleteUser,
  softDeleteUser,
  updateUserPassword,
  changeUserPassword,
};
