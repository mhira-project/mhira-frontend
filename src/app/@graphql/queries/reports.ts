import gql from 'graphql-tag';

const reports = gql`
  query($paging: CursorPaging, $filter: ReportFilter, $sorting: [ReportSort!]) {
    reports(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          anonymus
          name
          description
          status
          repositoryLink
          appName
          url
          resources
          createdAt
          updatedAt
          roles {
            id
            name
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

export const ReportsQueries = {
  reports,
};
