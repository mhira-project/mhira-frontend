import gql from 'graphql-tag';

const getPatients = gql`
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

export const PatientsQueries = {
  getPatients,
};
