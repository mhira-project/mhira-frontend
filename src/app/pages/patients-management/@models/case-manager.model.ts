import { CaseManager } from '../@types/case-manager';
import { AppDate } from '@shared/classes/app-date';
import { FormattedUser } from '@app/pages/user-management/@types/formatted-user';

export class CaseManagerModel {
  public static fromJson(json: any): CaseManager {
    json.formattedStatus = {
      color: json.active ? 'green' : 'orange',
      title: json.active ? 'ACTIVE' : 'INACTIVE',
    };

    json.formattedRoles = json.roles.map((role: { name: any }) => ({ color: 'blue', title: role.name }));
    json.formattedDepartments = json.departments.map((dep: { name: any }) => ({ color: 'cyan', title: dep.name }));
    return json;
  }

  public static toJson(value: CaseManager): string {
    return JSON.stringify(value);
  }

  public static updateData(json: any): CaseManager {
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
    const user: CaseManager = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (!excludedProperties.includes(key)) {
          user[key] = json[key];
        }
      }
    }
    return user;
  }
}
