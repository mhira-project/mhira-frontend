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

const deleteUser = gql`
  mutation($userId: Int!) {
    deleteUser(userId: $userId)
  }
`;

export const UsersMutations = {
  createUser,
  updateUser,
  deleteUser,
};
