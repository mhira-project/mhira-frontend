import gql from 'graphql-tag';

const createQuestionnaireBundle = gql`
  mutation($input: CreateQuestionnaireBundleInput!) {
    createQuestionnaireBundle(input: $input) {
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
      createdAt
      updatedAt
    }
  }
`;

const updateQuestionnaireBundle = gql`
  mutation($input: UpdateQuestionnaireBundleInput!) {
    updateQuestionnaireBundle(input: $input) {
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

const deleteQuestionnaireBundle = gql`
  mutation($_id: String!) {
    deleteQuestionnaireBundle(_id: $_id) {
      _id
      name
      departmentIds
      createdAt
      updatedAt
    }
  }
`;

export const BundleMutations = {
  createQuestionnaireBundle,
  updateQuestionnaireBundle,
  deleteQuestionnaireBundle,
};
