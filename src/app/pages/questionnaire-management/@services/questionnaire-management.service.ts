import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { QuestionnaireMutations } from '../../../@graphql/mutations/questionnaire';
import { QuestionnaireQueries } from '../../../@graphql/queries/questionnaire';
import { QuestionnaireVersion, ListQuestionnaireInput } from '../@types/questionnaire';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireManagementService {
  constructor(private apollo: Apollo) {}

  public uploadQuestionnaire(xlsForm: File): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: QuestionnaireMutations.uploadQuestionnaire,
      variables: { xlsForm },
      fetchPolicy: 'no-cache',
      context: {
        useMultipart: true,
      },
    });
  }

  public getQuestionnaires(filters: ListQuestionnaireInput = {}): Observable<QuestionnaireVersion[]> {
    return this.apollo
      .query<{ questionnaires: QuestionnaireVersion[] }>({
        query: QuestionnaireQueries.getQuestionnaires,
        variables: { filters },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result) => result.data.questionnaires));
  }
}
