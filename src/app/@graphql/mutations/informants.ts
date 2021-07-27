import gql from 'graphql-tag';

const createOneInformant = gql`
  mutation($input: CreateOneInformantInput!) {
    createOneInformant(input: $input) {
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
  }
`;

const createManyInformants = gql`
  mutation($input: CreateManyInformantsInput!) {
    createManyInformants(input: $input) {
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
  }
`;

const updateOneInformant = gql`
  mutation($input: UpdateOneInformantInput!) {
    updateOneInformant(input: $input) {
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
  }
`;

const updateManyInformants = gql`
  mutation($input: UpdateManyInformantsInput!) {
    updateManyInformants(input: $input) {
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
  }
`;

const deleteOneInformant = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneInformant(input: $input) {
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
    }
  }
`;

const deleteManyInformants = gql`
  mutation($input: DeleteManyInformantsInput!) {
    deleteManyInformants(input: $input) {
      deletedCount
    }
  }
`;

export const InformantsMutations = {
  createOneInformant,
  createManyInformants,
  updateOneInformant,
  updateManyInformants,
  deleteOneInformant,
  deleteManyInformants,
};
