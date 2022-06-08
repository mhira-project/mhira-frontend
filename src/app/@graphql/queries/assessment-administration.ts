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
          status
          createdAt
          updatedAt
        }
        cursor
      }
    }
  }
`;

const assessmentAdministrationActive = gql`
  query {
    activeAssessmentTypes {
      id
      name
      status
    }
  }
`;

export const AssessmentAdministrationQueries = {
  assessmentAdministration,
  assessmentAdministrationActive,
};
