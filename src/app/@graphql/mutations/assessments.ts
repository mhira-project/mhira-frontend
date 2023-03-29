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
      deliveryDate
      expirationDate
      assessmentType {
        id
        name
      }
      note
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
      deliveryDate
      expirationDate
      mailTemplateId
      note
      assessmentType {
        id
        name
      }
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
  mutation($id: Int!, $statusCancel: Boolean) {
    deleteAssessment(id: $id, statusCancel: $statusCancel)
  }
`;

const archiveOneAssessment = gql`
  mutation($id: Int!) {
    archiveOneAssessment(id: $id){
      id
    }
  }
`;

const restoreOneAssessment = gql`
  mutation($id: Int!) {
    restoreOneAssessment(id: $id){
      id
    }
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

const addAnswer = gql`
  mutation($assessment: AnswerAssessmentInput!) {
    addAnswer(assessment: $assessment) {
      _id
      answers {
        question
        valid
        textValue
        multipleChoiceValue
        numberValue
        dateValue
        booleanValue
      }
    }
  }
`;

const changeAssessmentStatus = gql`
  mutation($statusInput: ChangeAssessmentStatusInput!) {
    changeAssessmentStatus(statusInput: $statusInput) {
      _id
      status
    }
  }
`;

const sendAssessmentEmail = gql`
  mutation($assessmentId: ID!) {
    sendAssessmentEmail(assessmentId: $assessmentId)
  }
`;

export const AssessmentsMutations = {
  createOneAssessment,
  updateOneAssessment,
  deleteAssessment,
  archiveOneAssessment,
  restoreOneAssessment,
  createOneMongoAssessment,
  updateOneMongoAssessment,
  addAnswer,
  changeAssessmentStatus,
  sendAssessmentEmail
};
