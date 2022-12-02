import { FormattedUser } from '@app/pages/user-management/@types/formatted-user';
import { User } from '@app/pages/user-management/@types/user';

export class UserModel {
  public static fromJson(json: FormattedUser): User {
    json.formattedStatus = {
      color: json.active ? 'green' : 'orange',
      title: json.active ? 'ACTIVE' : 'INACTIVE',
    };

    json.formattedRoles = json.roles.map((role) => ({ color: 'blue', title: role.name }));
    json.formattedDepartments = json.departments.map((dep) => ({ color: 'cyan', title: dep.name }));
    return json;
  }

  public static updateData(json: FormattedUser): User {
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
    const user: User = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        if (!excludedProperties.includes(key)) {
          user[key] = json[key];
        }
      }
    }
    return user;
  }

  public static toJson(value: User): string {
    return JSON.stringify(value);
  }
}
