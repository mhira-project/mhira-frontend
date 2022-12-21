import gql from 'graphql-tag';

const getAllEmailTemplates = gql`
 query($paging: CursorPaging, $filter: MailTemplateFilter) {
    getAllEmailTemplates(paging: $paging, filter: $filter) {
        edges {
            node {
                id
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
