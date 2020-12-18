import { Informant } from '../@types/informant';
import { AppDate } from '@shared/classes/app-date';

export class InformantModel {
  public static fromJson(json: any): Informant {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.patientNames = json.patient
      ? `${json.patient.firstName} ${json.patient.middleName} ${json.patient.lastName}`
      : '';
    json.formattedRelationshipType = json.relationshipType ? json.relationshipType.name : '';
    return json;
  }

  public static toJson(value: Informant): string {
    return JSON.stringify(value);
  }
}
