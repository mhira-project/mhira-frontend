import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class NestJsQueriesService {
  getOneQuery(modelName: string, graphQlString: string) {
    return gql`
        query($id: ID!) {
        ${this.camelCaseString(modelName)}(id: $id) {
            ${graphQlString}
        }
    }`;
  }

  getManyQuery(modelName: string, graphQlString: string) {
    return gql`
        query($paging: CursorPaging, $filter: ${this.snakeCaseString(
          modelName
        )}Filter, $sorting: [${this.snakeCaseString(modelName)}Sort!]) {
        ${this.camelCaseString(modelName)}s(paging: $paging, filter: $filter, sorting: $sorting) {
            edges {
                cursor
                node {${graphQlString}}
            }
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }`;
  }

  createOneMutation(modelName: string, graphQlString: string) {
    return gql`
        mutation($input: CreateOne${this.snakeCaseString(modelName)}Input!) {
        createOne${this.snakeCaseString(modelName)}(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  createManyMutation(modelName: string, graphQlString: string) {
    return gql`
        mutation($input: CreateMany${this.snakeCaseString(modelName)}sInput!) {
        createMany${this.snakeCaseString(modelName)}s(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  updateOneMutation(modelName: string, graphQlString: string) {
    return gql`
        mutation($input: UpdateOne${this.snakeCaseString(modelName)}Input!) {
        updateOne${this.snakeCaseString(modelName)}(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  updateManyMutation(modelName: string, graphQlString: string) {
    return gql`
        mutation($input: UpdateMany${this.snakeCaseString(modelName)}sInput!) {
        updateMany${this.snakeCaseString(modelName)}s(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  deleteOneMutation(modelName: string, graphQlString: string) {
    return gql`
        mutation($input: DeleteOneInput!) {
        deleteOne${this.snakeCaseString(modelName)}(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  deleteManyMutation(modelName: string) {
    return gql`
        mutation($input: DeleteManyInput!) {
        deleteMany${this.snakeCaseString(modelName)}s(input: $input) {
            deletedCount
        }
    }`;
  }

  relationalCommandMutation(command: string, relationsInputType: string, graphQlString: string) {
    return gql`
        mutation($input: ${relationsInputType}!) {
        ${command}(input: $input) {
            ${graphQlString}
        }
    }`;
  }

  updateUserPassword() {
    return gql`
      mutation($input: UserUpdatePasswordInput!, $id: Int!) {
        updateUserPassword(input: $input, id: $id)
      }
    `;
  }

  private snakeCaseString(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toUpperCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  private camelCaseString(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
