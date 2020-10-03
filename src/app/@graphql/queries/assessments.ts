import gql from 'graphql-tag';

const getAssessments = gql`
  query {
    getAssessments {
      edges {
        cursor
        node {
          id
          active
          medicalRecordNo
          firstName
          middleName
          lastName
          phone
          email
          address
          gender
          birthDate
          birthCountryCode
          nationality
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

export const AssessmentsQueries = {
  getAssessments,
};
