import gql from 'graphql-tag';

const createQuestionnaire = gql`
  mutation($xlsForm: CreateQuestionnaireInput!) {
    createQuestionnaire(xlsForm: $xlsForm) {
      _id
      name
      status
      createdAt
      keywords
      copyright
      description
      website
      license
      timeToComplete
      questionnaire {
        language
        abbreviation
      }
    }
  }
`;

const updateQuestionnaire = gql`
  mutation($_id: String!, $xlsForm: UpdateQuestionnaireInput!) {
    updateQuestionnaire(_id: $_id, xlsForm: $xlsForm) {
      _id
      name
      status
      createdAt
      keywords
      copyright
      description
      website
      license
      timeToComplete
      questionnaire {
        language
        abbreviation
      }
    }
  }
`;

const deleteQuestionnaire = gql`
  mutation($_id: String!, $softDelete: Boolean) {
    deleteQuestionnaire(_id: $_id, softDelete: $softDelete) {
      _id
    }
  }
`;

export const QuestionnaireMutations = {
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
};
