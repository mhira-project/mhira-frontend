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

const deleteOneAssessment = gql`
  mutation($input: DeleteOneInput!) {
    deleteOneAssessment(input: $input) {
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
  planAssessment,
  deleteOneAssessment,
};
