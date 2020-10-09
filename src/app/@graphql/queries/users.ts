import gql from 'graphql-tag';

const getUsers = gql`
  query($paging: CursorPaging, $filter: UserFilter) {
    users(paging: $paging, filter: $filter) {
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
        }
        cursor
      }
    }
  }
`;

export const UsersQueries = {
  getUsers,
};
