export default {
  core: {
    assessments: 'Assessments',
    profile: 'Profile',
    caseManagers: 'Case Managers',
    departments: 'Departments',
    caregivers: 'Caregivers',
    reports: 'Reports',
    previous: 'Previous',
    next: 'Next',
    reset: 'Reset',
    search: 'Search',
    editCaregiver: 'Edit Caregiver',
    createCaregiver: 'Create Caregiver',
    questionnaire: 'Questionnaire',
    scripts: 'Scripts',
    pageSize: 'Page Size:',
    filter: 'Filter',
    notSet: 'Not Set',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    active: 'Active',
    inactive: 'Inactive',
    goBack: 'Go Back',
    deleteUser: 'Delete User',
    removeUser: ' To remove User',
    toggle: ' toggle the button below.',
    enable: 'To disable and Enable',
    disable: 'toggle the switch below.',
    change: 'Change Password',
    toChange: 'To change password for,',
    toChange2: 'toggle the button below.',
    enableDisable: 'Enable or Disable',
    delUser: 'Delete User',
    translations:  'Translations',
    help: 'Help',
    apply: 'Apply',
    actions: 'Actions'
   

  },
  dashboard: {
    welcome: 'Welcome to MHIRA',
    name: 'MHIRA',
    header: 'Select the report you want to generate:',
  },
  assessments: {
    myAssessment: 'My Assessments',
    archivedAssessments: 'Show Archived',
    notArchivedAssessments: 'Show Not Archived',
    

  },
  card: {
    changePassword: 'Change Password',
    profile: 'Profile',
    logout: 'Logout',
  },
  questionnaireSelection: {
    noResult: 'No Result',
    searchSelect: 'Search and select questionnaires to add to the assessment',
    selectQuestionnaires: 'Select Questionnaires',
    selectedQuestionnaires: 'Selected Questionnaires',
    selectBundles: 'Select Bundles'

  },
  assessmentMessages: {
    expiredText: 'Sorry, assessment is no longer available!',
    plannedText: 'Sorry, assessment is not available! It will be available at:',
    completedText: 'This assessment has been completed!',
  },
  menu: {
    dashboard: 'Dashboard',
    createAssessment: 'Create Assessment',
    caseManagement: 'Case Management',
    patientList: 'Patients List',
    createPatient: 'Create Patient',
    caregiverList: 'Caregiver List',
    questionnaires: 'Questionnaires',
    questionnairesList: 'Questionnaires',
    questionnairesVersionList: 'Discarded Questionnaires',
    uploadQuestionnaire: 'Upload Questionnaire',
    questionnaireBundles: 'Questionnaire Bundles',
    createQuestionnaireBundle: 'Create Bundle',
    updateQuestionnaireBundle: 'Update Bundle',
    assessments: 'Assessments',
    planAssessment: 'Plan Assessments',
    plannedAssessments: 'Planned Assessments',
    userManagement: 'User Management',
    listUsers: 'List Users',
    newUser: 'New User',
    administration: 'Administration',
    reports: 'Reports',
    createReport: 'Create Report',
    permissionMatrix: 'Permission Matrix',
    permissions: 'Permissions',
    roles: 'Roles',
    departments: 'Departments',
    settings: 'Settings',
    systemConfiguration: 'System Configuration',
    patientStatuses: 'Patient Statuses',
    notFound: 'Not Found',
    noTabs: 'No Tabs',
    disclaimers: 'Messages',
    emailTemplates: 'Email Templates',
    version: 'Version',
    createPatientStatus: 'Create PatientStatus'
  },
  patients: {
    myPatients: 'My Patients',
    archivedPatients: 'Show Archived',
    notArchivedPatients: 'Show not Archived'
  },
  tables: {
    assessmentAdministration: {
      assessmentType: 'Assessment Type',
      lastUpdate: 'Last Update',
      status: 'Status',
    },

    roles:{
      name: 'Role Name',
      hierarchy: 'Role Hierarchy',
      createdAt: 'Created At',
      deleteRole: 'Delete Role',
      updateRole:'Update Role',
      createRole: 'Create Role',
    },
    patientStatuses: {
      name: 'Name',
      description: 'Description',
      formattedUpdatedAt: 'Updated Date',
      formattedCreatedAt: 'Created Date',
    },
    patientStatus: {
      name: '',
      
      
    },
    disclaimer: {
      type: 'Type',
      textInformation: 'Text Information',
      lastUpdate: 'Last Update',
    },
    assessmentsPatients: {
      title: 'Assessment Name',
      manager: 'Manager',
      informant: 'Informant',
      questionnaires: 'Questionnaires',
      deliveryDate: 'Delivery Date',
      expirationDate: 'Expiration Date',
      emailStatus: 'Email Status',
      status: 'Status',
    },
    scripts: {
      name: 'Name',
      version: 'Version',
      creator: 'Creator',
      reports: 'Reports',
      repositoryLink: 'Repository Link',
    },
    reports: {
      name: 'Name',
      resources: 'Report Type',
      roles: 'Roles',
      status: 'Status',
      repositoryLink: 'Repository Link',
      createdAt: 'Created At',
    },
    patients: {
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name',
      medicalRecordNo: 'Hospital ID',
      gender: 'Gender',
      selectGender: 'Select Gender',
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
      patients: 'Patients',
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
      inactive: 'Inactive',
      active: 'Active',
      formattedRoles: 'Roles',
      formattedDepartments: 'Departments',
    },
    department: {
      name: 'Name',
      description: 'Description',
      formattedStatus: 'Status',
      createdAt: 'Created At',
      departmentName: 'Department Name',
      status: 'Status',
    },
   
  },
  forms: {
    assessmentAdministration: {
      typeName: 'Type Name',
      status: 'Status',
      descriptionName: 'Enter Type Name',
      validationName: 'Please Enter Type Name',
      createName: 'Create Assessment Name',
    },
    patientStatuses: {
      name: 'Name',
      submitPatient: 'Submit PatientStatus',
      description: 'Description',
      formattedUpdatedAt: 'Updated Date'
      


      

    },
    scripts: {
      name: 'Name',
      version: 'Version',
      creator: 'Creator',
      reports: 'Reports',
      excelFile: 'Export File',
      repositoryLink: 'Repository Link',
    },
    createReportForm: {
      reportName: 'Report Name',
      description: 'Description',
      descriptionReportName: 'Enter report name',
      validationReportName: 'Please enter report name',
      descriptionResources: 'Enter Report resources',
      patients: 'Patients',
      dashboard : 'Dashboard',
      validationResources: 'please Enter Report resources',
      descriptionPlace: 'Enter Report description',
      validationDescription: 'Please enter report description',
      descriptionUrl: 'Enter Report url',
      validationUrl: 'please Enter Report url',
      descriptionRespository: 'Enter Report repository link',
      validationRespository: 'Please enter Report repository link',
      submitButtonText: 'Save Report',


      resources: 'Resources',
      url: 'URL Of The Reporting Tool',
      appName: 'App Name',
      repositoryLink: 'Repository Link',
      reportStatus: 'Report Status',
      anonymus: 'Anonymus',
      roles: 'Roles',
    },
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
      descriptionUserName: 'Enter Username',
      validationUserName: 'Please enter valid username',
      descriptionId: 'Enter work id',
      validationId: 'Please fill in ID',
      descriptionEmail: 'Enter valid email',
      validationEmail: 'Please enter valid email',
      descriptionFirstName: 'Enter your first name',
      validationFirstName: 'Please enter your First name',
      descriptionMiddleName: 'Enter your middle name',
      validationMiddleName: 'Please enter your Middle name',
      descriptionLastName: 'Enter your last name',
      validationLastName: 'Please enter your last name',
      descriptionPhone: 'Enter phone number',
      validationPhone: 'Please fill phone number',
      descriptionPass: 'Enter Password',
      validationPass: 'Please fill password',
      descriptionRepeatPass: 'Repeat password',
      



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
      descriptionUsername: 'Enter Username',
      validationUsername: 'Please enter valid username',
      descriptionId: 'Enter ID',
      validationMessage: 'Please enter ID',
      descriptionEmail: 'Enter valid email',
      validationEmail: 'Please enter valid email',
      descriptionFirstName: 'Enter your first name',
      validationFirstName: 'Please enter your First name',
      descriptionMiddleName: 'Enter your middle name',
      validationMiddleName: 'Please enter your Middle name',
      descriptionLastName: 'Enter your last name',
      validationLastName: 'Please enter your last name',
      descriptionPhone: 'Enter phone number',
      validationPhone: 'Please fill phone number',
     

    },
    userRolesPermissions: {
      roleId: 'User Role',
    },
    patients: {
      patientInformation: 'Patient Information',
      savePatient: 'Save Patient',
      firstName: 'First Name',
      description: 'enter first name',
      descriptionMiddleName: 'enter middle name',
      descriptionLastName: 'enter last name',
      descriptionId: 'enter medical record number',
      description4: 'enter date of birth',
      description5: 'Select Department',
      description6: 'enter street name',
      description7: 'enter number',
      description8: 'enter apartment number',
      description9: 'enter place',
      description10: 'enter postal code',
      description11: 'Select Country',
      description12: 'Enter email address',
      description13: 'Enter phone number',
      description14: 'Enter alternative phone number',
      validationMessage: 'please enter first name',
      validationMessage1: 'please enter middle name',
      validationMessage2: 'please enter last name',
      validationMessage3: 'please enter medical record number',
      validationMessage4: 'please enter date of birth',
      validationMessage5: 'please select gender',
      validationMessage6: 'please select Department',
      validationMessage7: 'please enter street name',
      validationMessage8: 'please enter number',
      validationMessage9: 'please enter apartment number',
      validationMessage10: 'please enter place',
      validationMessage11: 'please enter postal code',
      validationMessage12: 'please select country',
      validationMessage13: 'please enter email address',
      validationMessage14: 'please enter phone number',
      validationMessage15: 'please alternative enter phone number',
      
      middleName: 'Middle Name',
      lastName: 'Last Name',
      id: 'Id',
      birthDate: 'Date of Birth',
      gender: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
      },
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
      descriptionContact: 'Enter contact phone',
      validationContact: 'please enter contact phone',
      descriptionContactName: 'Enter contact first name',
      validationContactName: 'please enter contact first name',
      descriptionMiddleName: 'Enter contact middle name',
      validationMiddleName: 'please enter contact middle name',
      descriptionLastName: 'Enter contact last name',
      validationLastName: 'please enter contact last name',
      descriptionEmail: 'Enter contact email',
      validationEmail: 'please enter contact email',
      descriptionContactNum: 'Enter contact number',
      validationContactNum: 'please enter contact number',
      descriptionPlace: 'Enter contact place',
      validationPlace: 'please enter contact place',
      descriptionPostal: 'Enter contact Postal Code',
      validationPostal: 'please enter contact Postal Code',
      descriptionCountry: 'Enter contact country',
      validationCountry: 'please enter contact country',
      relation: 'Relation to Patient',
      mother: 'Mother',
      father: 'Father22',

      number: 'Number',
      apartment: 'Apartment',
      place: 'Place',
      postalCode: 'Postal Code',
      country: 'Country',
      emergency: 'Emergency Contacts',
      note: 'Note',
      addCaregiver: 'Add Caregiver',
      firstNameDescription: 'Enter first name',
      middleNameDescription: 'Enter middle name',
      lastNameDescription: 'Enter last name',
      idDescription: 'Enter medical record number',
      female: 'Female',
      submitContact: 'Submit Contact',
     

    },
  },
  assessmentForm: {
    license: 'License: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} answered',
    optionalAnswered: '+{{actual}} optional',
    fillingTime: 'Filling time: {{time}}min',
    completeAssessment: 'Submit assessment',
    alreadyCompleted: 'Assessment is completed',
    overview: 'Finish Questionnaire',
    next: 'Next',
    prev: 'Previous',
    complete: 'Thank you for completing this assessment! You can close this page now.',
  },
  questionnaires: {
    questionnairesId: 'Version ID',
    id: 'ID',
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
    discardedTitle: 'Are You Sure You Want to Discard This Questionnaire?',
    discardedMessage: `<p>What happens when you discard a questionnaire?</p>
    <ol>
      <li><b>New Assessments</b>: You won't be able to use this questionnaire for new assessments.</li>
      <li><b>Data</b>: Any data you've already collected with this questionnaire will still be accessible.</li>
      <li><b>Report Scripts</b>: You will still be able to edit the scripts that generate reports based on this questionnaire.</li>
      <li><b>Location</b>: The questionnaire will be moved to a separate section called "Discarded Questionnaires." This is where you can edit the questionnaire, including its associated scripts.</li>
      <li><b>Replacement</b>: Discarding frees up space for a new questionnaire with the same language and abbreviation.</li>
    </ol>`,
    continueButton: 'Continue',
    cancelButton: 'Cancel',
    draft: '',

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
    description: 'Description',
    enterHere: 'Enter description here...',
    addKeyword: 'Type and press "Enter" to add the keyword!',
    pleaseUse: 'Please use',
    this: 'this',
    thisWeb: 'website to check the validity of your XSL form before uploading.'
  },
  plannedAssessments: {
    name: 'Assessment Name',
    formattedStatus: 'Status',
    patientMedicalRecordNo: 'Patient Hospital ID',
    formattedPatient: 'Patient',
    submissionDate: 'Submission Date',
    emailStatus: 'Email Status',
    clinicianWorkId: 'Clinician Work ID',
    formattedClinician: 'Clinician',
    informant: 'Informant',
    createdAt: 'Created At',
    expirationDate: 'Expiration Date',
    updatedAt: 'Submission Date',
    deliveryDate: 'Delivery Date',
    selectBundles:  'Select Bundles',
    selectBundle: 'Select your bundle...',
    questionnaires: 'Questionnaires',
    filterStatus: 'Filter Status'
  },
  planAssessment: {
    assessmentName: 'Assessment Name',
    patient: 'Select the patient this assesment belongs to',
    clinician: 'Clinician',
    informant: 'Informant',
  },
  createAssessment: {
    title: 'Assessment Name',
    assessmentManager: 'Assessment Manager',
    patient: 'Patient',
    departmentsUser: `Department's User`,
    patientsCaregiver: `Patient's Caregiver`,
    deliveryDate: 'Delivery Date',
    expirationDate: 'Expiration Date',
    notes: 'Notes for the assessment manager',
    informantType: 'Informant Type',
    selfRating: 'Self Rating',
    sendEmail: 'Send Email',
    viaEmail: 'Sent assessment via email',
    emailTemplate: 'Please select the email template',
    

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
  caregiver: {
    patient: 'Patient',
    birthDate: 'Birth Date',
    medicalRecordNumber: 'Medical Record Number',
    relationToPatient: 'Relation To Patient',
    nonExistingCaregiver: 'Add a non-existing caregiver:',
    existingCaregiver: 'Search for existing caregiver',
    searchCaregiver: 'Search existing caregiver number or name',
    add: 'ADD',
    newCaregiver: 'New Caregiver',
  },
  rolesPermissions: {
    permissions: 'Permissions',
    roles: 'Roles',
    roleName:'Role Name',
    description:'enter permission name',
    roleHierarchy: 'Role hierarchy',
    validationMessage:'please enter permission name',
    validationRole: 'Please enter role hierarchy',
    saveRole:'Save Role',
    editRole: 'Edit Role',
    createRole: 'Create Role',
    

  },
  emailTemplates:{

    createTemplate: 'Create Template',
    created: 'Email template created successfully!',
    updated: 'Email template updated successfully!',
    deleted: 'Email template deleted successfully!',
    unableToLoad: 'Unable to load email templates',
    name: 'Name',
    body: 'Body',
    selectBundleName: 'Select Bundle Name',
    questionnaires: 'Questionnaires',
    
    subject: 'Subject',
    status: 'Status',
    module: 'Module',
    active: 'Active',
    inactive: 'Inactive',
    emailBody: 'Enter email body here...',
    yes: 'Yes',
    no: 'No',
    allDepartments: 'All Departments',
    departments: 'Departments',
    update: 'Update',
    goBack: 'Go Back',
    submit: 'Submit'

  },
  emailStatusFilter:{
    expired: 'Expired',
    planned: 'Planned',
    pending: 'Pending',
    openForCompletion: 'Open For Completion',
    partiallyCompleted: 'Partially Completed',
    completed: 'Completed'
  },
  modal: {
    continue: 'Continue to next section?',
    continueOverview: 'Finish questionnaire?',
    unansweredQuestions: "You have {{count}} unanswered required question(s). All questions need to be answered to submit the questionnaire.",
    unansweredQuestionsOverview: "You have {{count}} unanswered required question(s). Are you sure you want to finish the questionnaire?",
    cancel: "Proceed Without Completing (Not Recommended)",
    ok: "Go Back and Complete the Questions"
  },
  bundles: {
    created: 'Bundle created successfully!',
    updated: 'Bundle updated successfully!',
    deleted: 'Bundle deleted successfully!',
    unableToLoad: 'Unable to load bundles!',
  }
};
