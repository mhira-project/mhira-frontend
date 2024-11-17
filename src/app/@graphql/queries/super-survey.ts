import gql from 'graphql-tag';

const getSuperSurveys = gql`
  query ($filter: SurveyTemplateFilter, $after: String, $first: Int) {
    surveyTemplates(filter: $filter, after: $after, first: $first) {
      edges {
        node {
          id
          createdAt
          updatedAt
          deletedAt
          fullName
          abbreviation
          description
          languages
          surveyJsTitle
          numberOfItems
          surveyJson
          license
          licenseText
          keywords
          status
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const getSuperSurvey = gql`
  query GetSuperSurvey($id: String!) {
    surveyTemplate(id: $id) {
      id
      fullName
      abbreviation
      description
      languages
      surveyJsTitle
      numberOfItems
      surveyJson
      license
      licenseText
      keywords
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const SuperSurveyQueries = {
  getSuperSurveys,
  getSuperSurvey,
};
