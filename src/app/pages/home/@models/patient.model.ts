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
    return json;
  }

  public static toJson(value: Patient): string {
    return JSON.stringify(value);
  }
}
