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

const updateOneAssessment = gql`
  mutation($id: ID!, $patientId: Int!, $date: DateTime, $name: String, $clinicianId: Int!, $informantId: Int!) {
    updateOneAssessment(
      input: {
        id: $id
        update: {
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

const deleteAssessment = gql`
  mutation($id: Float!, $archive: Boolean) {
    deleteAssessment(id: $id, archive: $archive)
  }
`;

const createOneMongoAssessment = gql`
  mutation($assessment: CreateFullAssessmentInput!) {
    createNewAssessment(assessment: $assessment) {
      id
    }
  }
`;

const updateOneMongoAssessment = gql`
  mutation($assessment: UpdateFullAssessmentInput!) {
    updateAssessment(assessment: $assessment) {
      id
    }
  }
`;

export const AssessmentsMutations = {
  createOneAssessment,
  updateOneAssessment,
  deleteAssessment,
  createOneMongoAssessment,
  updateOneMongoAssessment,
};
