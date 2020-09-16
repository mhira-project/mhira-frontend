import gql from 'graphql-tag';

const createPatient = gql`
  mutation($identifier: String!, $password: String!) {
    createPatient(identifier: $identifier, password: $password) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        phone
        createdAt
        updatedAt
      }
      guard
    }
  }
`;

const updatePatient = gql`
  mutation($identifier: String!, $password: String!) {
    createPatient(identifier: $identifier, password: $password) {
      accessToken
      refreshToken
      user {
        id
        name
        email
        phone
        createdAt
        updatedAt
      }
      guard
    }
  }
`;

export const PatientsMutations = {
  createPatient,
  updatePatient,
};
