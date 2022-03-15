import gql from 'graphql-tag';

const createOneScript = gql`
  mutation($input: CreateOneScriptInput!) {
    createOneScript(input: $input) {
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
        name
      }
    }
  }
`;

export const ScriptsMutations = {
  createOneScript,
};
