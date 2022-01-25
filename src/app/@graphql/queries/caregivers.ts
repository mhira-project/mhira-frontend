import gql from 'graphql-tag';

const caregivers = gql`
  query($paging: CursorPaging, $filter: CaregiverFilter, $sorting: [CaregiverSort!]) {
    departments(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          emergencyContact
          firstName
          middleName
          lastName
          email
          phone
          deletedAt
          createdAt
          updatedAt
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
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export const CaregiversQueries = {
  caregivers,
};
