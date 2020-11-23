import * as moment from 'moment';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { Department } from '@app/pages/administration/@types/department';

export class Convert {
  // Permission
  public static toPermission(json: any): Permission {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static permissionToJson(value: Permission): string {
    return JSON.stringify(value);
  }

  // Role
  public static toRole(json: any): Role {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static roleToJson(value: Role): string {
    return JSON.stringify(value);
  }

  // Department
  public static toDepartment(json: any): Department {
    json.createdAt = json.createdAt ? moment(json.createdAt).format('DD-MM-YYYY HH:mm') : '';
    return json;
  }

  public static departmentToJson(value: Department): string {
    return JSON.stringify(value);
  }
}
