import gql from 'graphql-tag';

const getReportsByResources = gql`
  query($resource: String!) {
    getReportsByResource(resource: $resource) {
      id
      appName
      name
      description
    }
  }
`;

export const ReportsByResourcesQueries = {
  getReportsByResources,
};
