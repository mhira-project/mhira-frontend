import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NestJsQueriesService } from '../../../@shared/services/nestjs-queries.service';
import { Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { ScriptsQueries } from '../../../@graphql/queries/scripts';
import {
  CreateOneScriptInput,
  Scripts,
  UpdateOneScriptInput,
} from '@app/pages/questionnaire-management/@types/scripts';
import { ScriptsMutations } from '@app/@graphql/mutations/scripts';

@Injectable({
  providedIn: 'root',
})
export class ScriptsService {
  constructor(private apollo: Apollo, private nestJsQueriesService: NestJsQueriesService) {}

  scripts(params?: {
    questionnaireId?: string;
    paging?: Paging;
    filter?: Filter;
    sorting?: Sorting[];
  }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: ScriptsQueries.scripts,
      variables: {
        questionnaireId: params.questionnaireId ? params.questionnaireId : undefined,
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createScript(createOneScriptInput: CreateOneScriptInput): Observable<FetchResult<any>> {
    const input = createOneScriptInput;
    return this.apollo.mutate({
      mutation: ScriptsMutations.createOneScript,
      variables: { input },
      fetchPolicy: 'no-cache',
      context: {
        useMultipart: true,
      },
    });
  }

  updateScript(id: number, updateOneScriptInput: CreateOneScriptInput): Observable<FetchResult<any>> {
    const { questionnaireId, ...rest } = updateOneScriptInput;
    const input = { id, update: { ...rest } };
    console.log(id);
    return this.apollo.mutate({
      mutation: ScriptsMutations.updateOneScript,
      variables: { input },
      fetchPolicy: 'no-cache',
      context: {
        useMultipart: true,
      },
    });
  }

  deleteScript(script: Scripts): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: ScriptsMutations.deleteOneScript,
      variables: {
        input: { id: script.id },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
