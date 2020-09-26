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

const getPatientInformants = gql`
  query($patientId: Int!, $first: Int, $after: String, $last: Int, $before: String) {
    getPatientInformants(patientId: $patientId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          workID
          firstName
          middleName
          lastName
          username
          phone
          email
          address
          gender
          birthDate
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

const getPatientCaseManagers = gql`
  query($patientId: Int!, $first: Int, $after: String, $last: Int, $before: String) {
    getPatientCaseManagers(patientId: $patientId, first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          workID
          firstName
          middleName
          lastName
          username
          phone
          email
          address
          gender
          birthDate
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
  getPatientInformants,
  getPatientCaseManagers,
};
