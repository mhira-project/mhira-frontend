import gql from 'graphql-tag';

const getQuestionnaireBundles = gql`
  query($paging: CursorPaging, $filter: QuestionnaireBundleFilter, $sorting: [QuestionnaireBundleSort!], $departmentIds: [Float!]) {
    getQuestionnaireBundles(paging: $paging, filter: $filter, sorting: $sorting, departmentIds: $departmentIds) {
      edges {
        node {
          _id
          name
          departmentIds
          questionnaires {
            _id
            name
            status
            xForm
            keywords
            copyright
            website
            license
            timeToComplete
            questionGroups {
              _id
              label
              appearance
              questions {
                _id
                name
                label
                type
                hint
                relevant
                calculation
                constraint
                constraintMessage
                min
                max
                required
                requiredMessage
                image
                appearance
                default
                choices {
                  _id
                  name
                  label
                  image
                }
              }
            }
            language
            abbreviation
            description
            zombie
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const getQuestionnaireBundle = gql`
  query($_id: String!) {
    getQuestionnaireBundle(_id: $_id) {
      _id
      name
      departmentIds
      questionnaires {
        _id
        name
        status
        xForm
        keywords
        copyright
        website
        license
        timeToComplete
        questionGroups {
          _id
          label
          appearance
          questions {
            _id
            name
            label
            type
            hint
            relevant
            calculation
            constraint
            constraintMessage
            min
            max
            required
            requiredMessage
            image
            appearance
            default
            choices {
              _id
              name
              label
              image
            }
          }
        }
        language
        abbreviation
        description
        zombie
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const BundleQueries = {
  getQuestionnaireBundles,
  getQuestionnaireBundle,
};
