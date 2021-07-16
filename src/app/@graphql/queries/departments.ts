import gql from 'graphql-tag';

const departments = gql`
  query($paging: CursorPaging, $filter: DepartmentFilter, $sorting: [DepartmentSort!]) {
    departments(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          name
          description
          active
          createdAt
          updatedAt
          users {
            id
            active
            firstName
            middleName
            lastName
            email
            phone
            workID
            address
            gender
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

export const DepartmentsQueries = {
  departments,
};
