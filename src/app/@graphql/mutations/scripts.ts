import gql from 'graphql-tag';

const createOneScript = gql`
  mutation($input: CreateQuestionnaireScriptInput!) {
    createNewQuestionnaireScript(input: $input) {
      id
      name
      scriptText
      version
      creator
      repositoryLink
      createdAt
      updatedAt
      deletedAt
      reports {
        id
      }
    }
  }
`;

const updateOneScript = gql`
  mutation($input: UpdateQuestionnaireScriptInput!) {
    updateOneQuestionnaireScript(input: $input) {
      id
      name
      scriptText
      version
      creator
      repositoryLink
      createdAt
      updatedAt
      deletedAt
      reports {
        id
      }
    }
  }
`;

const deleteOneScript = gql`
  mutation($input: DeleteQuestionnaireScriptInput!) {
    deleteOneQuestionnaireScript(input: $input) {
      id
    }
  }
`;

export const ScriptsMutations = {
  createOneScript,
  updateOneScript,
  deleteOneScript,
};
