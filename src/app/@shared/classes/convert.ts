import * as moment from 'moment';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { Department } from '@app/pages/administration/@types/department';
import { FormattedDepartment } from '../../pages/administration/@types/department';
import {
  QuestionnaireVersion,
  FormattedQuestionnaireVersion,
  QuestionnaireStatus,
} from '../../pages/questionnaire-management/@types/questionnaire';

const STATUS_COLOR = {
  [QuestionnaireStatus.DRAFT]: 'blue',
  [QuestionnaireStatus.PRIVATE]: 'orange',
  [QuestionnaireStatus.PUBLISHED]: 'green',
  [QuestionnaireStatus.ARCHIVED]: 'red',
};

export class Convert {
  // Permission
  public static toPermission(json: any): Permission {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static permissionToJson(value: Permission): string {
    return JSON.stringify(value);
  }

  // Role
  public static toRole(json: any): Role {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static roleToJson(value: Role): string {
    return JSON.stringify(value);
  }

  // Department
  public static toDepartment(json: any): FormattedDepartment {
    json.formattedStatus = {
      color: json.active ? 'green' : 'orange',
      title: json.active ? 'ACTIVE' : 'INACTIVE',
    };
    return json;
  }

  public static departmentToJson(value: Department): string {
    return JSON.stringify(value);
  }

  public static toFormattedQuestionnaireVersion(json: QuestionnaireVersion): FormattedQuestionnaireVersion {
    const questionnaire: FormattedQuestionnaireVersion = json as FormattedQuestionnaireVersion;

    questionnaire.formattedStatus = {
      color: STATUS_COLOR[questionnaire.status],
      title: questionnaire.status,
    };

    questionnaire.formattedKeywords =
      questionnaire?.keywords?.map((k) => ({
        color: 'blue',
        title: k,
      })) ?? [];

    questionnaire.language = json.questionnaire.language;
    questionnaire.abbreviation = json.questionnaire.abbreviation;

    return questionnaire;
  }
}
