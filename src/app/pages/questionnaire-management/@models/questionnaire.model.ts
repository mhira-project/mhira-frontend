import { FormattedQuestionnaireVersion, QuestionnaireVersion } from '../@types/questionnaire';

export class QuestionnaireModel {
  public static fromJson(json: FormattedQuestionnaireVersion): QuestionnaireVersion {
    const name = [json.name].filter((s) => !!s).join(' ');
    json.questionnaireTitle = [name].filter((s) => !!s).join(' - ');
    return json;
  }
}
