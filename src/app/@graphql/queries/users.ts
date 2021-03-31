import gql from 'graphql-tag';

const getUsers = gql`
  query($paging: CursorPaging, $filter: UserFilter, $sorting: [UserSort!]) {
    users(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
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
        }
        cursor
      }
    }
  }
`;

const getUserProfile = gql`
  query {
    user {
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
    }
  }
`;

export const UsersQueries = {
  getUsers,
  getUserProfile,
};
