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
    title: extract('Visit Creator'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'edit',
    submenu: [
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Schedule a visit'),
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
    title: extract('Settings'),
    iconType: 'nzIcon',
    iconTheme: 'fill',
    icon: 'setting',
    submenu: [
      {
        path: 'inquiries/filter/outgoing',
        title: extract('User Information'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Change Password'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Change Language'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Change Theme'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Help'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Licence Information'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Contact'),
        iconType: '',
        iconTheme: '',
        submenu: [],
      },
      {
        path: 'inquiries/filter/outgoing',
        title: extract('Credits'),
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
