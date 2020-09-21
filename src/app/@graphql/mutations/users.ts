import gql from 'graphql-tag';

const createUser = gql`
  mutation(
    $workID: String
    $firstName: String!
    $middleName: String
    $lastName: String!
    $phone: String
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
  ) {
    createUser(
      workId: $workID
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phone: $phone
      email: $email
      address: $address
      gender: $gender
      birthDate: $birthDate
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
    $phone: String
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
    $userId: Int!
  ) {
    updateUser(
      workID: $workID
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      phone: $phone
      email: $email
      address: $address
      gender: $gender
      birthDate: $birthDate
      userId: $userId
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
