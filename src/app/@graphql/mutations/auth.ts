import gql from 'graphql-tag';

const login = gql`
  query($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
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
