import gql from 'graphql-tag';

const planAssessment = gql`
  mutation(
    $patientId: Int!
    $clinicianId: Int!
    $informantId: Int!
    $assessmentDate: DateTime
    $questionnaires: [Int!]
  ) {
    planAssessment(
      input: {
        patientId: $patientId
        clinicianId: $clinicianId
        informantId: $informantId
        assessmentDate: $assessmentDate
        questionnaires: $questionnaires
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
      updatedAt
      createdAt
    }
  }
`;

const deleteAssessment = gql`
  mutation($id: Int!) {
    deleteAssessment(id: $id)
  }
`;

export const AssessmentsMutations = {
  planAssessment,
  deleteAssessment,
};
