import { SideNavInterface } from '@app/@layout/vertical/side-nav.type';
import { extract } from '@app/i18n';

export const MENU: SideNavInterface[] = [
  {
    path: 'home',
    title: extract('Home'),
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'home',
    submenu: [
      {
        path: 'home/patients',
        title: extract('Patients'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'home/case-managers',
        title: extract('Case Managers'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'assessments',
    title: extract('Assessments'),
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'edit',
    submenu: [
      {
        path: 'assessments/plan-assessments',
        title: extract('Plan assessment'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'assessments/planned-assessments',
        title: extract('View planned assessment'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'reports',
    title: extract('Reports'),
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'file-text',
    submenu: [
      {
        path: 'reports',
        title: extract('All Reports'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'administration',
    title: extract('Administration'),
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'setting',
    submenu: [
      {
        path: 'administration/user-management',
        title: extract('User Management'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'administration/roles-and-permissions',
        title: extract('Roles and Permissions'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'feedback',
    title: extract('Feedback'),
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'message',
    submenu: [],
  },
];
