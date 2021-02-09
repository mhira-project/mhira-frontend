import { AppDate } from '@shared/classes/app-date';
import { Patient } from '../@types/patient';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { Informant } from '@app/pages/patients-management/@types/informant';
import { CaseManager } from '@app/pages/patients-management/@types/case-manager';

export class PatientModel {
  public static fromJson(json: FormattedPatient): FormattedPatient {
    const name = [json.firstName, json.middleName, json.lastName].filter((s) => !!s).join(' ');
    json.patientTitle = [json.medicalRecordNo, name].filter((s) => !!s).join(' - ');
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedUpdatedAt = json.updatedAt ? AppDate.formatDate(json.updatedAt) : '';
    json.formattedBirthDate = json.birthDate ? AppDate.formatDate(json.birthDate) : '';

    const color = json.status
      ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
      : 'ng-trigger ng-trigger-fadeMotion ant-tag-orange ant-tag';

    json.formattedStatus = `<nz-tag class="${color}">${json.status ? json.status.name : 'not set'}</nz-tag>`;
    json.formattedInformants = json.informants.reduce(
      (str: string, informant: Informant) =>
        (str += `<nz-avatar  class="ant-avatar ant-avatar-circle">
            <span class="ant-avatar-string ng-star-inserted" style="transform: scale(1) translateX(-50%);">
               ${informant?.firstName.charAt(0)}
             </span>
          </nz-avatar>`),
      ''
    );
    json.formattedCaseManagers = json.caseManagers.reduce(
      (str: string, caseManager: CaseManager) =>
        (str += `<nz-avatar  class="ant-avatar ant-avatar-circle">
            <span class="ant-avatar-string ng-star-inserted" style="transform: scale(1) translateX(-50%);">
               ${caseManager?.firstName.charAt(0)}
             </span>
          </nz-avatar>`),
      ''
    );
    return json;
  }

  public static updateData(json: any): Patient {
    const excludedProperties = [
      'caseManagers',
      'informants',
      'updatedAt',
      'createdAt',
      'country',
      'status',
      'emergencyContacts',
      'formattedCaseManagers',
      'formattedCreatedAt',
      'formattedUpdatedAt',
      'formattedBirthDate',
      'formattedStatus',
      'formattedInformants',
      '__typename',
    ];
    const patient: any = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (!excludedProperties.includes(key)) {
          patient[key] = json[key];
        }
      }
    }
    return patient;
  }

  public static toJson(value: Patient): string {
    return JSON.stringify(value);
  }
}
