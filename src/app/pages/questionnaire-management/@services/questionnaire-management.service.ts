import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { QuestionnaireMutations } from '../../../@graphql/mutations/questionnaire';
import { QuestionnaireQueries } from '../../../@graphql/queries/questionnaire';
import {
  QuestionnaireVersion,
  ListQuestionnaireInput,
  CreateQuestionnaireInput,
  UpdateQuestionnaireInput,
} from '../@types/questionnaire';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireManagementService {
  constructor(private apollo: Apollo) {}

  public createQuestionnaire(xlsForm: CreateQuestionnaireInput): Observable<QuestionnaireVersion> {
    return this.apollo
      .mutate<{ createQuestionnaire: QuestionnaireVersion }>({
        mutation: QuestionnaireMutations.createQuestionnaire,
        variables: { xlsForm },
        fetchPolicy: 'no-cache',
        context: {
          useMultipart: true,
        },
      })
      .pipe(map((result) => result.data.createQuestionnaire));
  }

  public updateQuestionnaire(_id: string, xlsForm: UpdateQuestionnaireInput): Observable<QuestionnaireVersion> {
    console.log('UPDATE', _id, xlsForm);
    return this.apollo
      .mutate<{ updateQuestionnaire: QuestionnaireVersion }>({
        mutation: QuestionnaireMutations.updateQuestionnaire,
        variables: { _id, xlsForm },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result) => result.data.updateQuestionnaire));
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

  public deleteQuestionnaire(_id: string, softDelete: boolean = true) {
    return this.apollo.mutate({
      mutation: QuestionnaireMutations.deleteQuestionnaire,
      variables: { _id, softDelete },
      fetchPolicy: 'no-cache',
    });
  }
}
