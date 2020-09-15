import gql from 'graphql-tag';

const loginQuery = gql`
  query($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      accessToken
      user {
        id
        email
        name
        phone
        type
      }
    }
  }
`;

const getOwnInstitutionUsers = gql`
  query($searchKeyword: String, $first: Int, $last: Int, $after: String, $before: String) {
    getOwnInstitutionUsers(searchKeyword: $searchKeyword, first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
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
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
const getADMIN_getAdminUsers = gql`
  query($searchKeyword: String, $first: Int, $last: Int, $after: String, $before: String) {
    ADMIN_getAdminUsers(searchKeyword: $searchKeyword, first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          email
          phone
          createdAt
          updatedAt
          deletedAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
const getADMIN_getInstitutionUsers = gql`
  query($searchKeyword: String, $institutionId: Int, $first: Int, $last: Int, $after: String, $before: String) {
    ADMIN_getInstitutionUsers(
      institutionId: $institutionId
      searchKeyword: $searchKeyword
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
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
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export const UsersQueries = {
  loginQuery,
  getOwnInstitutionUsers,
  getADMIN_getInstitutionUsers,
  getADMIN_getAdminUsers,
};
