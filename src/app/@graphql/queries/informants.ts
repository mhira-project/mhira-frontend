import gql from 'graphql-tag';

const informants = gql`
  query($paging: CursorPaging, $filter: InformantFilter) {
    informants(paging: $paging, filter: $filter) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          patientId
          firstName
          middleName
          lastName
          phone
          email
          address
          relationshipTypeId
          createdAt
          updatedAt
          relationshipType {
            id
            name
            createdAt
            updatedAt
            deletedAt
          }
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
          }
        }
        cursor
      }
    }
  }
`;

export const InformantsQueries = {
  informants,
};
