import { Assessment } from '@app/pages/assessment/@types/assessment';
import * as moment from 'moment';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { Department } from '@app/pages/administration/@types/department';
import { FormattedDepartment } from '../../pages/administration/@types/department';
import { FormattedAssessment } from '../../pages/assessment/@types/assessment';
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

    questionnaire.language = json.questionnaire.language;
    questionnaire.abbreviation = json.questionnaire.abbreviation;

    return questionnaire;
  }

  public static toFormattedAssessment(json: Assessment): FormattedAssessment {
    const assessment: FormattedAssessment = json as FormattedAssessment;

    assessment.formattedPatient = [
      json.patient?.firstName?.charAt(0),
      json.patient?.middleName?.charAt(0),
      json.patient?.lastName?.charAt(0),
    ]
      .filter((s) => !!s)
      .join('');

    assessment.formattedClinician = [
      json.clinician?.firstName?.charAt(0),
      json.clinician?.middleName?.charAt(0),
      json.clinician?.lastName?.charAt(0),
    ]
      .filter((s) => !!s)
      .join('');

    return assessment;
  }
}
