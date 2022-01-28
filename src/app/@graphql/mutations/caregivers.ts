import gql from 'graphql-tag';

const createOneCaregiver = gql`
  mutation($input: createOneCaregiverInput!) {
    createOneCaregiver(input: $input) {
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
    }
  }
`;

const createManyCaregivers = gql`
  mutation($input: createManyCaregiversInput!) {
    createManyCaregivers(input: $input) {
      id
      patientId
      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const updateOneCaregiver = gql`
  mutation($input: updateOneCaregiverInput!) {
    updateOneCaregiver(input: $input) {
      id
      patientId
      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const updateManyCaregivers = gql`
  mutation($input: updateManyCaregiversInput!) {
    updateManyCaregivers(input: $input) {
      id
      patientId
      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const deleteOneCaregiver = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneCaregiver(input: $input) {
      id
      patientId
      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const deleteManyCaregivers = gql`
  mutation($input: deleteManyCaregiversInput!) {
    deleteManyCaregivers(input: $input) {
      deletedCount
    }
  }
`;

const removeCaregiverFromPatient = gql`
  mutation($input: removeCaregiverFromPatientInput!) {
    removeCaregiverFromPatient(input: $input) {
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
      caregivers {
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

const addCaregiversToPatient = gql`
  mutation($input: AddCaregiversToPatientInput!) {
    addCaregiversToPatient(input: $input) {
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
      caregivers {
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

export const CaregiversMutations = {
  createOneCaregiver,
  createManyCaregivers,
  updateOneCaregiver,
  updateManyCaregivers,
  deleteOneCaregiver,
  deleteManyCaregivers,
  removeCaregiverFromPatient,
  addCaregiversToPatient,
};
