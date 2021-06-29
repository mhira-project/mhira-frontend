import gql from 'graphql-tag';

const getQuestionnaires = gql`
  query ($paging: CursorPaging, $filter: QuestionnaireVersionFilter, $sorting: [QuestionnaireVersionSort!]) {
    questionnaires(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
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
    }
  }
`;

export const QuestionnaireQueries = {
  getQuestionnaires,
};
