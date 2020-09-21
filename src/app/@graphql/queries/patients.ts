import gql from 'graphql-tag';

const getPatients = gql`
  query {
    getPatients {
      edges {
        cursor
        node {
          id
          active
          medicalRecordNo
          firstName
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

export const PatientsQueries = {
  getPatients,
};
