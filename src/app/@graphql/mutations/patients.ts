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

const assignClinician = gql`
  mutation($userId: Int!, $patientId: Int!) {
    assignClinician(userId: $userId, patientId: $patientId)
  }
`;

const assignInformant = gql`
  mutation($userId: Int!, $patientId: Int!) {
    assignInformant(userId: $userId, patientId: $patientId)
  }
`;

const unassignClinician = gql`
  mutation($userId: Int!, $patientId: Int!) {
    unassignClinician(userId: $userId, patientId: $patientId)
  }
`;

const unassignInformant = gql`
  mutation($userId: Int!, $patientId: Int!) {
    unassignInformant(userId: $userId, patientId: $patientId)
  }
`;

export const PatientsMutations = {
  createPatient,
  updatePatient,
  deletePatient,
  assignClinician,
  assignInformant,
  unassignClinician,
  unassignInformant,
};
