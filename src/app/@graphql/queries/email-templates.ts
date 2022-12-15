import gql from 'graphql-tag';

// const getAllEmailTemplates = gql`
// query($paging: CursorPaging, $filter: AssessmentTypeFilter) {
//     assessmentTypes(paging: $paging, filter: $filter) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       edges {
//         node {
//           id
//           name
//           status
//           createdAt
//           updatedAt
//         }
//         cursor
//       }
//     }
// }
// `;

const getAllEmailTemplates = gql` {
    getAllEmailTemplates {
        edges {
            node {
                name
                status
                subject
                module
                body
            }
        }
        pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
    }
}
`;


export const EmailTemplatesQueries = {
    getAllEmailTemplates
};
