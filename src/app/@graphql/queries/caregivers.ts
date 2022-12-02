import gql from 'graphql-tag';

const caregivers = gql`
  query($paging: CursorPaging, $filter: CaregiverFilter, $sorting: [CaregiverSort!]) {
    caregivers(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          #          emergencyContact
          firstName
          middleName
          lastName
          email
          phone
          street
          number
          apartment
          place
          postalCode
          country
          #          relation
          #          note
          #          street
          #          number
          #          apartment
          #          place
          #          postalCode
          #          country
          deletedAt
          createdAt
          updatedAt
          patientCaregivers {
            relation
            id
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

export const CaregiversQueries = {
  caregivers,
};
