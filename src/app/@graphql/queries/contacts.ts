import gql from 'graphql-tag';

const emergencyContacts = gql`
  query($paging: CursorPaging, $filter: EmergencyContactFilter, $sorting: [EmergencyContactSort!]) {
    emergencyContacts(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          patientId
          firstName
          middleName
          lastName
          phone
          email
          createdAt
          updatedAt
          deletedAt
          patient {
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

export const EmergencyContactsQueries = {
  emergencyContacts,
};
