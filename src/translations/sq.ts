export default {
  dashboard: {
    welcome: 'Mirë se Vini në MHIRA',
    name: 'MHIRA',
  },
  menu: {
    dashboard: 'Paneli Kryesor',
    caseManagement: 'Menaxhimi i Rasteve',
    patientList: 'Lista e Klientëve',
    createPatient: 'Krijo një Klient',
    caregiverList: 'Lista e Kujdestarëve',
    questionnaires: 'Pyetësorët',
    questionnairesList: 'Lista e Pyetësorëve',
    uploadQuestionnaire: 'Krijo një Pyetësor',
    assessments: 'Vlerësimet',
    planAssessment: 'Planifiko Vlerësimin',
    plannedAssessments: 'Vlerësimet e Planifikuara',
    userManagement: 'Menaxhimi i Përdoruesve',
    listUsers: 'Lista e Përdoruesve',
    newUser: 'Krijo një Përdorues',
    administration: 'Administrimi',
    reports: 'Raporte',
    permissionMatrix: 'Matrica e Autorizimeve',
    permissions: 'Autorizimet',
    roles: 'Rolet',
    departments: 'Departamentet',
    settings: 'Aranzhimet',
    systemConfiguration: 'Konfigurimi i Sistemit',
    patientStatuses: 'Statusi i Klientëve',
    notFound: 'Nuk është gjetur',
    noTabs: 'Nuk ka skedar',
  },
  tables: {
    patients: {
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      medicalRecordNo: 'ID e Klientit',
      gender: 'Gjinia',
      birthDate: 'Data e Lindjes',
      status: 'Statusi',
      informants: 'Personi Informues',
      caseManager: 'Menaxheri i Rastit',
      createdAt: 'Krijuar më',
      formattedDepartments: 'Departamentet',
    },
    contact: {
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      email: 'E-Mail',
      phone: 'Telefoni',
      relation: 'Marrëdhënie',
      emergency: 'Emergjenca',
      note: 'Shënim',
      patients: 'Pacientët',
    },
    casemanagers: {
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      workID: 'ID e punës',
      phone: 'Telefoni',
      username: 'Emri i Përdoruesit',
    },
    departments: {
      name: 'Emri',
      description: 'Përshkrimi',
      createdAt: 'Krijuar më',
    },
    users: {
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      workID: 'ID e punës',
      phone: 'Telefoni',
      username: 'Emri i Përdoruesit',
      formattedStatus: 'Statusi',
      formattedRoles: 'Rolet',
      formattedDepartments: 'Departamentet',
    },
    department: {
      name: 'Emri',
      description: 'Përshkrimi',
      formattedStatus: 'Statusi',
      createdAt: 'Krijuar më',
    },
  },
  forms: {
    changePassword: {
      newPassword: 'Shkruaj një fjalëkalim të ri',
      newPasswordConfirmation: 'Rishkruaj fjalëkalimin',
    },
    changeUserPassword: {
      currentPassword: 'Shkruaj fjalëkalimin e tanishëm',
      newPassword: 'Shkruaj fjalëkalimin e ri',
      newPasswordConfirmation: 'Rishkruaj fjalëkalimin e ri',
    },
    userProfile: {
      username: 'Emri i Përdoruesit për Login',
      workID: 'ID',
      email: 'Emaili',
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      phone: 'Telefoni',
      password: 'Fjalëkalimi',
      passwordConfirmation: 'Rishkruaj Fjalëkalimin',
    },
    userProfileEdit: {
      username: 'Emri i Përdoruesit për Login',
      workID: 'ID',
      email: 'Emaili',
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      phone: 'Telefoni',
    },
    userRolesPermissions: {
      roleId: 'Roli i Përdoruesit',
    },
    patients: {
      patientInformation: 'Informatat mbi Klientin',
      firstName: 'Emri',
      middleName: 'Emri i Mesëm',
      lastName: 'Mbiemri',
      id: 'Id',
      birthDate: 'Data e Lindjes',
      gender: 'Gjinia',
      department: 'Departamenti',
      patientAddress: 'Adresa e Klientit',
      street: 'Emri i Rrugës',
      addressNumber: 'Numri i Hyrjes',
      addressApartment: 'Numri i Apartamentit',
      addressPlace: 'Vendbanimi',
      addressPostalCode: 'Kodi Postar',
      addressCountryCode: 'Shteti',
      patientContact: 'Kontakti i Klientit',
      email: 'Email Adresa',
      phone: 'Telefoni',
      phone2: 'Numër tjetër Telefoni',
      relation: 'Marrëdhënia me Pacientin',
      number: 'Numër',
      apartment: 'Apartment',
      place: 'Vendi',
      postalCode: 'Kodi Postar',
      country: 'Shteti',
      emergency: 'Kontakti Emergjent',
      note: 'Shënim',
      addCaregiver: 'Shto Kujdestar',
    },
  },
  assessmentForm: {
    license: 'Liçensa: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} me përgjigje',
    optionalAnswered: '+{{actual}} opcionale',
    fillingTime: 'Koha e shpenzuar: {{time}}min',
    completeAssessment: 'Përfundo vlerësimin',
    alreadyCompleted: 'Vlerësimi u përfundua',
    overview: 'Përmbledhje',
    next: 'Përpara',
    prev: 'Prapa',
    complete: 'Faleminderit që e përfunduat vlerësimin! Tani mund ta mbyllni këtë faqe.',
  },
  questionnaires: {
    name: 'Emri',
    formattedStatus: 'Statusi',
    language: 'Gjuha',
    abbreviation: 'Shkurtim',
    keywords: 'Fjalë Kyçe',
    timeToComplete: 'Koha për të Përfunduar',
    copyright: 'E Drejta e Autorit',
    website: 'Faqja e Internetit',
    license: 'Liçensë',
    createdAt: 'Krijuar Në',
  },
  questionnairesForm: {
    name: 'Emri',
    excelFile: 'Skedar Excel',
    status: 'Statusi',
    language: 'Gjuha',
    copyright: 'E Drejta e Autorit',
    timeToComplete: 'Koha Për Të Përfunduar (minuta)',
    website: 'Faqja e Internetit',
    license: 'Liçensë',
    keywords: 'Fjalë Kyçe',
  },
  plannedAssessments: {
    name: 'Emri',
    formattedStatus: 'Statusi',
    patientMedicalRecordNo: 'ID e Spitalit të Pacientit Në',
    formattedPatient: 'Pacient',
    clinicianWorkId: 'ID e Punës së Mjekut',
    formattedClinician: 'Mjeku',
    informant: 'Informatori',
    createdAt: 'Krijuar Në',
  },
  planAssessment: {
    assessmentName: 'Emri i Vlerësimit',
    patient: 'Pacienti',
    clinician: 'Mjeku',
    informant: 'Informatori',
  },
  form: {
    system: {
      systemLocale: 'Cakto Vendin e Sistemit',
      systemTimezone: 'Cakto Zonën Kohore të Sistemit',
      dateFormat: 'Vendosni Formatin e Datës',
      timeFormat: 'Vendosni Formatin e Kohës',
      passwordLifeTimeInDays: 'Kohëzgjatja e fjalëkalimit (në ditë)',
      passwordReUseCutoffInDays: 'Ndërprerja e ripërdorimit të fjalëkalimit (në ditë)',
      maxLoginAttempts: 'Përpjekjet maksimale të hyrjes',
    },
  },
};
