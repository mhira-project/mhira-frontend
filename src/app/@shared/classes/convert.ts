import { Assessment } from '@app/pages/assessment/@types/assessment';
import * as moment from 'moment';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { Department } from '@app/pages/administration/@types/department';
import { FormattedDepartment } from '../../pages/administration/@types/department';
import { FormattedAssessment, FullAssessment, AssessmentStatus } from '../../pages/assessment/@types/assessment';
import {
  QuestionnaireVersion,
  FormattedQuestionnaireVersion,
  QuestionnaireStatus,
} from '../../pages/questionnaire-management/@types/questionnaire';
import { Reports } from '@app/pages/administration/@types/reports';

const STATUS_COLOR = {
  [QuestionnaireStatus.DRAFT]: 'blue',
  [QuestionnaireStatus.PRIVATE]: 'orange',
  [QuestionnaireStatus.PUBLISHED]: 'green',
  [QuestionnaireStatus.ARCHIVED]: 'red',
};

const ASSESSMENT_STATUS_COLOR = {
  [AssessmentStatus.PLANNED]: 'grey',
  [AssessmentStatus.OPEN_FOR_COMPLETION]: 'black',
  [AssessmentStatus.PARTIALLY_FILLED]: 'blue',
  [AssessmentStatus.COMPLETED]: 'green',
  [AssessmentStatus.CANCELLED]: 'red',
  [AssessmentStatus.EXPIRED]: 'orange',
};

export class Convert {
  // Permission
  public static toPermission(json: any): Permission {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static toReport(json: any): Reports {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY') : '';
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

  public static toFormattedQuestionnaireVersion2(json: QuestionnaireVersion): FormattedQuestionnaireVersion {
    const questionnaire: FormattedQuestionnaireVersion = json as FormattedQuestionnaireVersion;

    questionnaire.formattedStatus = {
      color: STATUS_COLOR['grey'],
      title: 'OLD VERSION',
    };

    return questionnaire;
  }

  public static toFormattedAssessment(json: Assessment | FullAssessment): FormattedAssessment {
    const assessment: FormattedAssessment = json as FormattedAssessment;

    assessment.formattedPatient = [json.patient?.firstName, json.patient?.middleName, json.patient?.lastName]
      .filter((s) => !!s)
      .join(' ');

    assessment.formattedClinician = [json.clinician?.firstName, json.clinician?.middleName, json.clinician?.lastName]
      .filter((s) => !!s)
      .join(' ');

    if (isFullAssessment(json)) {
      assessment.formattedStatus = {
        color: ASSESSMENT_STATUS_COLOR[json.questionnaireAssessment.status],
        title: json.questionnaireAssessment.status,
      };
    }

    assessment.patientMedicalRecordNo = assessment.patient.medicalRecordNo;
    assessment.clinicianWorkId = assessment.clinician?.workID;

    assessment.formatedDeliveryDate = assessment.deliveryDate
      ? moment(assessment.deliveryDate).format('DD-MM-YYYY')
      : '';
    assessment.formatedExpirationDate = assessment.expirationDate
      ? moment(assessment.expirationDate).format('DD-MM-YYYY')
      : '';

    return assessment;
  }
}

const isFullAssessment = (json: Assessment | FullAssessment): json is FullAssessment =>
  !!(json as FullAssessment).questionnaireAssessment;
