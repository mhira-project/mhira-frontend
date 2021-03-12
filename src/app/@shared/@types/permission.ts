export enum PermissionKey {
  VIEW_PATIENTS = 'view patients',
  MANAGE_PATIENTS = 'manage patients',
  DELETE_PATIENTS = 'delete patients',

  VIEW_ASSESSMENTS = 'view assessments',
  MANAGE_ASSESSMENTS = 'manage assessments',
  DELETE_ASSESSMENTS = 'delete assessments',

  VIEW_USERS = 'view users',
  MANAGE_USERS = 'manage users',
  DELETE_USERS = 'delete users',

  VIEW_ROLES_PERMISSIONS = 'view roles_permissions',
  MANAGE_ROLES_PERMISSIONS = 'manage roles_permissions',

  VIEW_SYSCONF = 'view sysconf',
  MANAGE_SYSCONF = 'manage sysconf',

  VIEW_SETTINGS = 'view settings',
  MANAGE_SETTINGS = 'manage settings',

  VIEW_QUESTIONNAIRES = 'view questionnaires',
  MANAGE_QUESTIONNAIRES = 'manage questionnaires',
  DELETE_QUESTIONNAIRES = 'delete questionnaires',

  VIEW_REPORTING_TOOLS = 'view reporting_tools',
  MANAGE_REPORTING_TOOLS = 'manage reporting_tools',
}

export const isPermissionKey = (key: any): key is PermissionKey => {
  return Object.values(PermissionKey).includes(key);
};

export const isPermissionKeyArray = (arr: any): arr is PermissionKey[] => {
  return typeof arr === 'object' && Object.values(arr).every((key) => isPermissionKey(key));
};
