import { SuperSurvey } from '@app/pages/super-survey/@types/super-survey';

export class SuperSurveyModel {
  public static fromJson(json: SuperSurvey): SuperSurvey {
    const name = [json.fullName].filter((s) => !!s).join(' ');
    json.surveyJson = [name].filter((s) => !!s).join(' - ');
    return json;
  }
}
