import { AppDate } from '@shared/classes/app-date';
import { PatientStatus } from '../../../patients-management/@types/patient-status';

export class PatientStatusModel {
  public static fromJson(json: any): PatientStatus {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedUpdatedAt = json.updatedAt ? AppDate.formatDate(json.updatedAt) : '';
    return json;
  }

  public static toJson(value: PatientStatus): string {
    return JSON.stringify(value);
  }
}
