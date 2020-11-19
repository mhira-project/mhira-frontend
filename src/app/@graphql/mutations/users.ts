import gql from 'graphql-tag';

const createUser = gql`
  mutation(
    $workID: String
    $firstName: String!
    $middleName: String
    $lastName: String!
    $password: String!
    $username: String!
    $phone: String
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
  ) {
    createUser(
      input: {
        workID: $workID
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        password: $password
        username: $username
        phone: $phone
        email: $email
        address: $address
        gender: $gender
        birthDate: $birthDate
      }
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

export const UsersMutations = {
  createUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  changeUserPassword,
};
