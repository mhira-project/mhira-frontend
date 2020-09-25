import gql from 'graphql-tag';

const getUsers = gql`
  query($searchKeyword: String, $first: Int, $after: String, $last: Int, $before: String) {
    getUsers(searchKeyword: $searchKeyword, first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          workID
          firstName
          middleName
          lastName
          username
          phone
          email
          address
          gender
          birthDate
          updatedAt
          createdAt
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
  getUsers,
};
