import gql from 'graphql-tag';

const scripts = gql`
  query($questionnaireId: String!, $paging: CursorPaging) {
    scripts(questionnaireId: $questionnaireId, paging: $paging) {
      edges {
        cursor
        node {
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
    }
  }
`;

export const ScriptsQueries = {
  scripts,
};
