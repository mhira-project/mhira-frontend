import gql from 'graphql-tag';

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

export const CaseManagersMutations = {
  assignPatientCaseManager,
  assignPatientInformant,
  unassignPatientInformant,
  unassignPatientCaseManager,
};
