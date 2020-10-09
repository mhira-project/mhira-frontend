import gql from 'graphql-tag';

const createOneAssessment = gql`
  mutation($patientId: Int!, $date: DateTime, $name: String, $clinicianId: Int!, $informantId: Int!) {
    createOneAssessment(
      input: {
        assessment: {
          patientId: $patientId
          date: $date
          name: $name
          clinicianId: $clinicianId
          informantId: $informantId
        }
      }
    ) {
      id
      date
      name
      patientId
      clinicianId
      informantId
      status
      createdAt
      updatedAt
      deletedAt
      informant {
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
      }
      clinician {
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
      }
      patient {
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
      }
    }
  }
`;

const deleteOneAssessment = gql`
  mutation($id: ID!) {
    deleteOneAssessment(input: { id: $id }) {
      id
      date
      name
      patientId
      clinicianId
      informantId
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const AssessmentsMutations = {
  createOneAssessment,
  deleteOneAssessment,
};
