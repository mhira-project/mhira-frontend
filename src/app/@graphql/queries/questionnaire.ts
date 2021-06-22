import gql from 'graphql-tag';

const getQuestionnaires = gql`
  query ($filters: ListQuestionnaireInput!) {
    questionnaires(filters: $filters) {
      _id
      name
      status
      createdAt
      keywords
      copyright
      website
      license
      timeToComplete
      questionnaire {
        _id
        language
        abbreviation
      }
    }
  }
`;

export const QuestionnaireQueries = {
  getQuestionnaires,
};
