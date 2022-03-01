import gql from 'graphql-tag';

const getReportsByResources = gql`
  query($resource: String!) {
    getReportsByResource(resource: $resource) {
      resources
      id
      url
      name
      description
    }
  }
`;

export const ReportsByResourcesQueries = {
  getReportsByResources,
};
