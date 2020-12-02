import { CaseManager } from '../@types/case-manager';
import { AppDate } from '@shared/classes/app-date';

export class CaseManagerModel {
  public static fromJson(json: any): CaseManager {
    json.formattedCreatedAt = json.createdAt ? AppDate.formatDate(json.createdAt) : '';
    json.formattedBirthDate = json.birthDate ? AppDate.formatDate(json.birthDate) : '';
    const color = json.active
      ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
      : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
    const active = json.active ? 'ACTIVE' : 'INACTIVE';

    json.formattedActive = `<nz-tag class="${color}">${active}</nz-tag>`;
    json.formattedRoles = '';
    json.roles.forEach((role: any) => {
      json.formattedRoles += `<nz-tag class="ant-tag-blue ant-tag ml-5">${role.name}</nz-tag>`;
    });

    json.formattedDepartments = '';
    json.departments.forEach((department: any) => {
      json.formattedDepartments += `<nz-tag class="ant-tag-cyan ant-tag ml-5">${department.name}</nz-tag>`;
    });
    return json;
  }

  public static toJson(value: CaseManager): string {
    return JSON.stringify(value);
  }
}
