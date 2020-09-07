import { SideNavInterface } from '@app/@layout/vertical/side-nav.type';
import { extract } from '@app/i18n';

export const MENU: SideNavInterface[] = [
  {
    path: 'home',
    title: extract('Home'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'home',
    submenu: [
      {
        path: 'home',
        title: extract('Patients'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'home',
        title: extract('Case Management'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'inquiries',
    title: extract('Assessments'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'edit',
    submenu: [
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Plan assessment'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
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
    iconTheme: 'fill',
    icon: 'file-text',
    submenu: [
      {
        path: 'inquiries/filter/outgoing',
        title: extract('All Reports'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'billing',
    title: extract('Administration'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'setting',
    submenu: [
      {
        path: 'inquiries/filter/outgoing',
        title: extract('User Management'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Roles and Permissions'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'users',
    title: extract('Feedback'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'message',
    submenu: [],
  },
];
