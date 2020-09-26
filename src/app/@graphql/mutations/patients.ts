import gql from 'graphql-tag';

const createPatient = gql`
  mutation(
    $active: Boolean
    $medicalRecordNo: String
    $firstName: String!
    $middleName: String
    $lastName: String!
    $phone: String
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
    $birthCountryCode: String
    $nationality: String
  ) {
    createPatient(
      input: {
        active: $active
        medicalRecordNo: $medicalRecordNo
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        phone: $phone
        email: $email
        address: $address
        gender: $gender
        birthDate: $birthDate
        birthCountryCode: $birthCountryCode
        nationality: $nationality
      }
    ) {
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
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const updatePatient = gql`
  mutation(
    $active: Boolean
    $medicalRecordNo: String
    $firstName: String!
    $middleName: String
    $lastName: String!
    $phone: String
    $email: String
    $address: String
    $gender: String
    $birthDate: DateTime
    $birthCountryCode: String
    $nationality: String
    $id: Int!
  ) {
    updatePatient(
      id: $id
      input: {
        active: $active
        medicalRecordNo: $medicalRecordNo
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        phone: $phone
        email: $email
        address: $address
        gender: $gender
        birthDate: $birthDate
        birthCountryCode: $birthCountryCode
        nationality: $nationality
      }
    ) {
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
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const deletePatient = gql`
  mutation($id: Int!) {
    deletePatient(id: $id)
  }
`;

const assignPatientCaseManager = gql`
  mutation($userId: Int!, $patientId: Int!) {
    assignPatientCaseManager(userId: $userId, patientId: $patientId)
  }
`;

const assignPatientInformant = gql`
  mutation($userId: Int!, $patientId: Int!) {
    assignPatientInformant(userId: $userId, patientId: $patientId)
  }
`;

const unassignPatientInformant = gql`
  mutation($userId: Int!, $patientId: Int!) {
    unassignPatientInformant(userId: $userId, patientId: $patientId)
  }
`;

const unassignPatientCaseManager = gql`
  mutation($userId: Int!, $patientId: Int!) {
    unassignPatientCaseManager(userId: $userId, patientId: $patientId)
  }
`;

export const PatientsMutations = {
  createPatient,
  updatePatient,
  deletePatient,
  assignPatientCaseManager,
  assignPatientInformant,
  unassignPatientInformant,
  unassignPatientCaseManager,
};
