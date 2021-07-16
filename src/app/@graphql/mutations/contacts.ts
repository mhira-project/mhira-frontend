import gql from 'graphql-tag';

const createOneEmergencyContact = gql`
  mutation($input: CreateOneEmergencyContactInput!) {
    createOneEmergencyContact(input: $input) {
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
    }
  }
`;

const createManyEmergencyContacts = gql`
  mutation($input: CreateManyEmergencyContactsInput!) {
    createManyEmergencyContacts(input: $input) {
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
    }
  }
`;

const updateOneEmergencyContact = gql`
  mutation($input: UpdateOneEmergencyContactInput!) {
    updateOneEmergencyContact(input: $input) {
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
    }
  }
`;

const updateManyEmergencyContacts = gql`
  mutation($input: UpdateManyEmergencyContactsInput!) {
    updateManyEmergencyContacts(input: $input) {
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
    }
  }
`;

const deleteOneEmergencyContact = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneEmergencyContact(input: $input) {
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
    }
  }
`;

const deleteManyEmergencyContacts = gql`
  mutation($input: DeleteManyEmergencyContactsInput!) {
    deleteManyEmergencyContacts(input: $input) {
      deletedCount
    }
  }
`;

const removeEmergencyContactsFromPatient = gql`
  mutation($input: RemoveEmergencyContactsFromPatientInput!) {
    removeEmergencyContactsFromPatient(input: $input) {
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
  }
`;

const addEmergencyContactsToPatient = gql`
  mutation($input: AddEmergencyContactsToPatientInput!) {
    addEmergencyContactsToPatient(input: $input) {
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
  }
`;

export const EmergencyContactsMutations = {
  createOneEmergencyContact,
  createManyEmergencyContacts,
  updateOneEmergencyContact,
  updateManyEmergencyContacts,
  deleteOneEmergencyContact,
  deleteManyEmergencyContacts,
  addEmergencyContactsToPatient,
  removeEmergencyContactsFromPatient,
};
