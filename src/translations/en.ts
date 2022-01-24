export default {
  dashboard: {
    welcome: 'Welcome to MHIRA',
    name: 'MHIRA',
  },
  menu: {
    dashboard: 'Dashboard',
    caseManagement: 'Case Managment',
    patientList: 'Patients List',
    createPatient: 'Create Patient',
    caregiverList: 'Caregiver List',
    questionnaires: 'Questionnaires',
    questionnairesList: 'Questionnaires List',
    uploadQuestionnaire: 'Upload Questionnaire',
    assessments: 'Assessments',
    planAssessment: 'Plan Assessments',
    plannedAssessments: 'Planned Assessments',
    userManagement: 'User Management',
    listUsers: 'List Users',
    newUser: 'New User',
    administration: 'Administration',
    reports: 'Reports',
    permissionMatrix: 'Permission Matrix',
    permissions: 'Permissions',
    roles: 'Roles',
    departments: 'Departments',
    settings: 'Settings',
    systemConfiguration: 'System Configuration',
    patientStatuses: 'Patient Statuses',
    notFound: 'Not Found',
    noTabs: 'No Tabs',
  },
  tables: {
    patients: {
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      medicalRecordNo: 'Hospital ID',
      gender: 'Gender',
      birthDate: 'Date of Birth',
      status: 'Status',
      informants: 'Informants',
      caseManager: 'Case Manager',
      createdAt: 'Created At',
    },
    contact: {
      firstName: 'First name',
      middleName: 'Middle name',
      lastName: 'Last name',
      email: 'E-Mail',
      phone: 'Phone',
      relation: 'Relation',
      emergency: 'Emergency',
      note: 'Note',
    },
    casemanagers: {
      firstName: 'First name',
      middleName: 'Middle name',
      lastName: 'Last name',
      workID: 'Work ID',
      phone: 'Phone',
      username: 'Login Username',
    },
    departments: {
      name: 'Name',
      description: 'Description',
      createdAt: 'Created At',
    },
    users: {
      firstName: 'First name',
      middleName: 'Middle name',
      lastName: 'Last name',
      workID: 'Work ID',
      phone: 'Phone',
      username: 'Username',
      formattedStatus: 'Status',
      formattedRoles: 'Roles',
      formattedDepartments: 'Departments',
    },
    department: {
      name: 'Name',
      description: 'Description',
      formattedStatus: 'Status',
      createdAt: 'Created At',
    },
  },
  forms: {
    changePassword: {
      newPassword: 'Enter New Password',
      newPasswordConfirmation: 'Repeat Password',
    },
    changeUserPassword: {
      currentPassword: 'Enter current password',
      newPassword: 'Enter new password',
      newPasswordConfirmation: 'Repeat password',
    },
    userProfile: {
      username: 'Login Username',
      workID: 'ID',
      email: 'Email',
      firstName: 'First Name',
      middleName: 'Middle name',
      lastName: 'Last name',
      phone: 'Phone',
      password: 'Password',
      passwordConfirmation: 'Repeat Password',
    },
    userProfileEdit: {
      username: 'Login Username',
      workID: 'ID',
      email: 'Email',
      firstName: 'First Name',
      middleName: 'Middle name',
      lastName: 'Last name',
      phone: 'Phone',
    },
    userRolesPermissions: {
      roleId: 'User Role',
    },
    patients: {
      patientInformation: 'Patient Information',
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      id: 'Id',
      birthDate: 'Date of Birth',
      gender: 'Gender',
      department: 'Department',
      patientAddress: 'Patient Address',
      street: 'Street',
      addressNumber: 'Number',
      addressApartment: 'Apartment',
      addressPlace: 'Place',
      addressPostalCode: 'Postal Code',
      addressCountryCode: 'Country',
      patientContact: 'Patient Contact',
      email: 'Email Address',
      phone: 'Phone',
      phone2: 'Alternative Phone',
      emergencyContacts: 'Emergency Contacts',
    },
  },
  assessmentForm: {
    license: 'License: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} answered',
    optionalAnswered: '+{{actual}} optional',
    fillingTime: 'Filling time: {{time}}min',
    completeAssessment: 'Submit assessment',
    alreadyCompleted: 'Assessment is completed',
    overview: 'Overview',
    next: 'Next',
    prev: 'Previous',
    complete: 'Thank you for completing this assessment! You can close this page now.',
  },
  questionnaires: {
    name: 'Name',
    formattedStatus: 'Status',
    language: 'Language',
    abbreviation: 'Abbreviation',
    keywords: 'Keywords',
    timeToComplete: 'Time To Complete',
    copyright: 'Copyright',
    website: 'Website',
    license: 'License',
    createdAt: 'Created At',
  },
  questionnairesForm: {
    name: 'Name',
    excelFile: 'XSL Form',
    status: 'Status',
    language: 'Language',
    copyright: 'Copyright',
    timeToComplete: 'Time to complete (minutes)',
    website: 'Website',
    license: 'License',
    keywords: 'Keywords',
  },
  plannedAssessments: {
    name: 'Name',
    formattedStatus: 'Status',
    patientMedicalRecordNo: 'Patient Hospital ID',
    formattedPatient: 'Patient',
    clinicianWorkId: 'Clinician Work ID',
    formattedClinician: 'Clinician',
    informant: 'Informant',
    createdAt: 'Created At',
  },
  planAssessment: {
    assessmentName: 'Assessment Name',
    patient: 'Patient',
    clinician: 'Clinician',
    informant: 'Informant',
  },
  form: {
    system: {
      systemLocale: 'Set System Locale',
      systemTimezone: 'Set System Time Zone',
      dateFormat: 'Set Date Format',
      timeFormat: 'Set Time Format',
      passwordLifeTimeInDays: 'Password Life Time (In Days)',
      passwordReUseCutoffInDays: 'Password Re-Use Cut Off(In Days)',
      maxLoginAttempts: 'Max Login Attempts',
    },
  },
};
