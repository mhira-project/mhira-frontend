import gql from 'graphql-tag';

const scripts = gql`
  query($paging: CursorPaging, $filter: ScriptFilter, $sorting: [ScriptSort!]) {
    scripts(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          name
          version
          creator
          repositoryLink
          createdAt
          updatedAt
          scriptRoles {
            roleId
            role {
              name
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
