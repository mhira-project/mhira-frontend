import { AppDate } from '@shared/classes/app-date';
import { User } from '../@types/user';

export class UserModel {
  public static fromJson(json: any): User {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedUpdatedAt = json.updatedAt ? AppDate.formatDate(json.updatedAt) : '';
    json.formattedBirthDate = json.birthDate ? AppDate.formatDate(json.birthDate) : '';

    const color = json.active
      ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
      : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
    const active = json.active ? 'ACTIVE' : 'INACTIVE';

    json.formattedStatus = `<nz-tag class="${color}">${active}</nz-tag>`;
    json.formattedRoles = '';
    json.roles.forEach((role: { name: string }) => {
      json.formattedRoles += `<nz-tag class="ant-tag-blue ant-tag ml-5">${role.name}</nz-tag>`;
    });

    json.formattedDepartments = '';
    json.departments.forEach((department: { name: any }) => {
      json.formattedDepartments += `<nz-tag class="ant-tag-cyan ant-tag ml-5">${department.name}</nz-tag>`;
    });
    return json;
  }

  public static updateData(json: any): User {
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
    const user: any = {};
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
