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
        gender
        birthDate
        updatedAt
        createdAt
      }
    }
  }
`;

const logout = gql`
  mutation($currentPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      newPasswordConfirmation: $newPasswordConfirmation
    )
  }
`;

export const AuthMutations = {
  login,
  logout,
};
