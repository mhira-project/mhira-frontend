import gql from 'graphql-tag';

const permissions = gql`
  query($paging: CursorPaging, $filter: PermissionFilter, $sorting: [PermissionSort!]) {
    permissions(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          name
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
          roles {
            id
            name
            hierarchy
            code
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

const userPermissionGrants = gql`
  query {
    userPermissionGrants {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const PermissionsQueries = {
  permissions,
  userPermissionGrants,
};
