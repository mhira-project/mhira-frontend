import gql from 'graphql-tag';

const updateUser = gql`
  mutation($id: ID!, $username: String!, $email: String!, $role: String) {
    updateUser(data: { id: $id, username: $username, email: $email, role: $role }) {
      id
      username
      phone
      role
      email
      createdAt
    }
  }
`;

const updateUserPassword = gql`
  mutation($currentPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
      newPasswordConfirmation: $newPasswordConfirmation
    )
  }
`;

const createInstitutionUser = gql`
  mutation($email: String!, $password: String!, $name: String!, $phone: String!) {
    createInstitutionUser(input: { email: $email, password: $password, name: $name, phone: $phone }) {
      id
      institutionId
      name
      email
      phone
      createdAt
      updatedAt
      deletedAt
      institution {
        id
        code
        name
        enabled
        address
        isMobileWallet
        deletedAt
        meta
      }
    }
  }
`;

const updateInstitutionUser = gql`
  mutation($id: Int!, $email: String!, $name: String!, $phone: String!) {
    updateInstitutionUser(id: $id, input: { email: $email, name: $name, phone: $phone }) {
      id
      institutionId
      name
      email
      phone
      createdAt
      updatedAt
      deletedAt
      institution {
        id
        code
        name
        enabled
        address
        isMobileWallet
        deletedAt
        meta
      }
    }
  }
`;

const deleteInstitutionUser = gql`
  mutation($id: Float!) {
    deleteInstitutionUser(id: $id)
  }
`;

const updateInstitutionUserPassword = gql`
  mutation($id: Int!, $newPassword: String!) {
    updateInstitutionUserPassword(id: $id, input: { newPassword: $newPassword }) {
      id
      institutionId
      name
      email
      phone
      createdAt
      updatedAt
      deletedAt
      institution {
        id
        code
        name
        enabled
        address
        isMobileWallet
        deletedAt
        meta
      }
    }
  }
`;

export const UserMutations = {
  updateUser,
  updateUserPassword,
  createInstitutionUser,
  updateInstitutionUser,
  deleteInstitutionUser,
  updateInstitutionUserPassword,
};
