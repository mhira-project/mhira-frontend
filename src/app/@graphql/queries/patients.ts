import gql from 'graphql-tag';

const getPatients = gql`
  query($paging: CursorPaging, $filter: PatientFilter, $sorting: [PatientSort!]) {
    patients(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          statusId
          medicalRecordNo
          firstName
          middleName
          lastName
          phone
          phone2
          email
          addressStreet
          addressNumber
          addressApartment
          addressPlace
          addressPostalCode
          addressCountryCode
          gender
          birthDate
          birthCountryCode
          nationality
          createdAt
          deletedAt
          updatedAt
          emergencyContacts {
            id
            firstName
            middleName
            lastName
            phone
            email
            createdAt
            updatedAt
          }
          informants {
            id
            firstName
            middleName
            lastName
            phone
            email
            address
            createdAt
            updatedAt
          }
          caseManagers {
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
          }
          status {
            id
            name
            description
            createdAt
            updatedAt
          }
        }
        cursor
      }
    }
  }
`;

export const PatientsQueries = {
  getPatients,
};
