import gql from 'graphql-tag';

const login = gql`
  mutation($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      accessToken
      refreshToken
      user {
        id
        workID
        firstName
        lastName
        phone
        email
        address
        isSuperUser
        passwordChangeRequired
        gender
        birthDate
        updatedAt
        createdAt
        roles {
          id
          name
          isSuperAdmin
          hierarchy
          code
          createdAt
          updatedAt
        }
        permissions {
          id
          name
          createdAt
          updatedAt
        }
        departments {
          id
          name
          description
          active
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const logout = gql`
  mutation {
    logout
  }
`;

export const AuthMutations = {
  login,
  logout,
};
