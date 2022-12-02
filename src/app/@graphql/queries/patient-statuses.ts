import gql from 'graphql-tag';

const patientStatuses = gql`
  query($paging: CursorPaging, $filter: PatientStatusFilter) {
    patientStatuses(paging: $paging, filter: $filter) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          description
          createdAt
          updatedAt
        }
        cursor
      }
    }
  }
`;

export const PatientStatusesQueries = {
  patientStatuses,
};
