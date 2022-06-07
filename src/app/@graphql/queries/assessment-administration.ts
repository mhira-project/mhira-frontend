import gql from 'graphql-tag';

const assessmentAdministration = gql`
  query($paging: CursorPaging, $filter: AssessmentTypeFilter) {
    assessmentTypes(paging: $paging, filter: $filter) {
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
          createdAt
          updatedAt
        }
        cursor
      }
    }
  }
`;

export const AssessmentAdministrationQueries = {
  assessmentAdministration,
};
