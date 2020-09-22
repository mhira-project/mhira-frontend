import gql from 'graphql-tag';

const getUsers = gql`
  query {
    getUsers {
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
