import gql from 'graphql-tag';

const getPatients2 = gql`
  query($paging: CursorPaging, $filter: PatientFilter) {
    patients(paging: $paging, filter: $filter) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
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
        cursor
      }
    }
  }
`;
const getPatients = gql`
  query(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $searchKeyword: String
    $active: Boolean
    $createdAtFrom: DateTime
    $createdAtTo: DateTime
    $caseManagerId: Int
  ) {
    getPatients(
      first: $first
      after: $after
      last: $last
      before: $before
      searchKeyword: $searchKeyword
      active: $active
      createdAtFrom: $createdAtFrom
      createdAtTo: $createdAtTo
      caseManagerId: $caseManagerId
    ) {
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
  query($first: Int, $after: String, $last: Int, $before: String, $patientId: Int!) {
    getPatientInformants(first: $first, after: $after, last: $last, before: $before, patientId: $patientId) {
      edges {
        cursor
        node {
          id
          workID
          firstName
          middleName
          lastName
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
  query(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $searchKeyword: String
    $patientId: Int!
    $caseManagerId: Int
  ) {
    getPatientCaseManagers(
      first: $first
      after: $after
      last: $last
      before: $before
      searchKeyword: $searchKeyword
      patientId: $patientId
      caseManagerId: $caseManagerId
    ) {
      edges {
        cursor
        node {
          id
          workID
          firstName
          middleName
          lastName
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
  getPatients2,
};
