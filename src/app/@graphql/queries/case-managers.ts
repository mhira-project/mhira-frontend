import gql from 'graphql-tag';

const getPatientCaseManagers = gql`
  query(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $searchKeyword: String
    $patientId: Int
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
          username
          active
          firstName
          middleName
          lastName
          email
          phone
          workID
          address
          gender
          birthDate
          nationality
          createdAt
          updatedAt
          deletedAt
          departments {
            name
            description
            active
          }
          roles {
            id
            name
            createdAt
            updatedAt
          }
          permissions {
            id
            name
            createdAt
            updatedAt
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

const getPatientInformants = gql`
  query($first: Int, $after: String, $last: Int, $before: String, $patientId: Int!) {
    getPatientInformants(first: $first, after: $after, last: $last, before: $before, patientId: $patientId) {
      edges {
        cursor
        node {
          id
          username
          active
          firstName
          middleName
          lastName
          email
          phone
          workID
          address
          gender
          birthDate
          nationality
          createdAt
          updatedAt
          deletedAt
          departments {
            name
            description
            active
          }
          roles {
            id
            name
            createdAt
            updatedAt
          }
          permissions {
            id
            name
            createdAt
            updatedAt
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

export const CaseManagersQueries = {
  getPatientCaseManagers,
  getPatientInformants,
};
