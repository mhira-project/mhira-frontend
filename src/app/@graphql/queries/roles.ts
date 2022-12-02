import gql from 'graphql-tag';

const roles = gql`
  query($paging: CursorPaging, $filter: RoleFilter, $sorting: [RoleSort!]) {
    roles(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          name
          isSuperAdmin
          hierarchy
          code
          createdAt
          updatedAt
          users {
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
          }
          permissions {
            id
            name
            createdAt
            updatedAt
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

export const RolesQueries = {
  roles,
};
