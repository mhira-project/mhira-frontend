import { AppDate } from '@shared/classes/app-date';
import { Patient } from '../@types/patient';

export class PatientModel {
  public static fromJson(json: any): Patient {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedUpdatedAt = json.updatedAt ? AppDate.formatDate(json.updatedAt) : '';
    json.formattedBirthDate = json.birthDate ? AppDate.formatDate(json.birthDate) : '';
    let color;
    if (json.status) {
      switch (json.status.name) {
        case 'active':
          color = 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag';
          break;
        case 'inactive':
          color = 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          break;
        case 'archived':
          color = 'ng-trigger ng-trigger-fadeMotion ant-tag-orange ant-tag';
          break;
      }
    } else {
      color = 'ng-trigger ng-trigger-fadeMotion ant-tag-orange ant-tag';
    }

    json.formattedStatus = `<nz-tag class="${color}">${json.status ? json.status.name : 'not set'}</nz-tag>`;
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
