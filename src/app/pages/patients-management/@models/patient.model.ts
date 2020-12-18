import { AppDate } from '@shared/classes/app-date';
import { Patient } from '../@types/patient';

export class PatientModel {
  public static fromJson(json: any): Patient {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedUpdatedAt = json.updatedAt ? AppDate.formatDate(json.updatedAt) : '';
    json.formattedBirthDate = json.birthDate ? AppDate.formatDate(json.birthDate) : '';
    const color = json.active
      ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
      : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
    const active = json.active ? 'ACTIVE' : 'INACTIVE';

    json.formattedActive = `<nz-tag class="${color}">${active}</nz-tag>`;
    json.formattedInformants = ``;
    json.informants.map((informant: any) => {
      json.formattedInformants =
        json.formattedInformants +
        `
          <nz-avatar  class="ant-avatar ant-avatar-circle">
             <span class="ant-avatar-string ng-star-inserted" style="transform: scale(1) translateX(-50%);">
               ${informant?.firstName.charAt(0)}
             </span>
          </nz-avatar>
      `;
    });
    json.formattedCaseManagers = ``;
    json.caseManagers.map((caseManager: any) => {
      json.formattedCaseManagers =
        json.formattedCaseManagers +
        `
                                  <nz-avatar  class="ant-avatar ant-avatar-circle">
                                     <span class="ant-avatar-string ng-star-inserted" style="transform: scale(1) translateX(-50%);">
                                       ${caseManager?.firstName.charAt(0)}
                                     </span>
                                  </nz-avatar>`;
    });
    return json;
  }

  public static toJson(value: Patient): string {
    return JSON.stringify(value);
  }
}
