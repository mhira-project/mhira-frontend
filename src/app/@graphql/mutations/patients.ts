import gql from 'graphql-tag';

const createPatient = gql`
  mutation($input: CreateOnePatientInput!) {
    createOnePatient(input: $input) {
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

const updatePatient = gql`
  mutation($input: UpdateOnePatientInput!) {
    updateOnePatient(input: $input) {
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

const deletePatient = gql`
  mutation($input: DeleteOneInput!) {
    deleteOnePatient(input: $input) {
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
`;

const addInformantsToPatient = gql`
  mutation($input: AddInformantsToPatientInput!) {
    addInformantsToPatient(input: $input) {
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
`;

const removeStatusFromPatient = gql`
  mutation($input: RemoveStatusFromPatientInput!) {
    removeStatusFromPatient(input: $input) {
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

export const PatientsMutations = {
  createPatient,
  updatePatient,
  deletePatient,
  addInformantsToPatient,
  removeStatusFromPatient,
};
