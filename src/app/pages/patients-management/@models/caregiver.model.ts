import { Caregiver, FormattedCaregiver } from '../@types/caregiver';

export class CaregiverModel {
  public static fromJson(json: FormattedCaregiver): Caregiver {
    json.formattedStatus = {
      color: json.emergency ? 'green' : 'red',
      title: json.emergency ? 'YES' : 'NO',
    };
    return json;
  }

  public static updateData(json: FormattedCaregiver): Caregiver {
    const excludedProperties = [
      'permissions',
      'roles',
      'updatedAt',
      'createdAt',
      'departments',
      'formattedDepartments',
      'formattedRoles',
      'formattedCreatedAt',
      'formattedUpdatedAt',
      'formattedBirthDate',
      'formattedStatus',
      '__typename',
    ];
    const caregiver: any = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (!excludedProperties.includes(key)) {
          caregiver[key] = json[key];
        }
      }
    }
    return caregiver;
  }

  public static toJson(value: Caregiver): string {
    return JSON.stringify(value);
  }
}
