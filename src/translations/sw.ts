export default {
  dashboard: {
    welcome: 'Karibu  MHIRA',
    name: 'MHIRA',
  },
  menu: {
    dashboard: 'Dashibodi',
    createAssessment: 'Tengeneza Tathmini',
    caseManagement: 'Usimamizi Wa Kesi',
    patientList: 'Orodha Ya Wagonjwa',
    createPatient: 'Sajili Mgonjwa',
    caregiverList: 'Orodha ya Walezi',
    questionnaires: 'Madodoso',
    questionnairesList: 'Orodha Ya Madodoso',
    uploadQuestionnaire: 'Pakia Dodoso',
    questionnairesVersionList: 'Orodha ya Toleo la Hojaji',
    assessments: 'Tathmini',
    planAssessment: 'Panga Tathmini',
    plannedAssessments: 'Tathmini Zilizopangwa',
    userManagement: 'Usimamizi Wa Watumiaji',
    listUsers: 'Orodhesha Watumiaji',
    newUser: 'Mtumiaji Mpya',
    administration: 'Utawala',
    reports: 'Ripoti',
    createReport: 'Kuunda Ripoti',
    permissionMatrix: 'Jedwali La Ruhusa',
    permissions: 'Ruhusa',
    roles: 'Majukumu',
    departments: 'Idara',
    settings: 'Mipangilio',
    systemConfiguration: 'Usanidi wa Mfumo',
    patientStatuses: 'Hadhi za Mgonjwa',
    notFound: 'Haipo',
    noTabs: 'Hakuna kurasa',
  },
  tables: {
    assessmentsPatients: {
      title: 'Kichwa',
      manager: 'Meneja',
      informant: 'Mtoa taarifa',
      questionnaires: 'Hojaji',
      deliveryDate: 'Tarehe ya Uwasilishaji',
      expirationDate: 'Tarehe ya kumalizika Muda Wake',
      status: 'Hali',
    },
    scripts: {
      name: 'Jina',
      version: 'Toleo',
      creator: 'Muumba',
      reports: 'Ripoti',
      repositoryLink: 'Kiungo Cha Hifadhi',
    },
    reports: {
      name: 'Jina',
      resources: 'Aina ya Ripoti',
      roles: 'Majukumu',
      status: 'Hali',
      repositoryLink: 'Kiungo cha Hifadhi',
      createdAt: 'Imeundwa Katika',
    },
    patients: {
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      medicalRecordNo: 'Namba ya Hospitali',
      gender: 'Jinsia',
      birthDate: 'Tarehe ya Kuzaliwa',
      status: 'Status',
      informants: 'Mtoa Taarifa',
      caseManager: 'Muhudumu',
      createdAt: 'Imetengenezwa',
    },
    contact: {
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      email: 'E-Mail',
      phone: 'Namba ya Simu',
      relation: 'Uhusiano',
      emergency: 'Dharura',
      note: 'Kumbuka',
      patients: 'Mgonjwa',
    },
    casemanagers: {
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      workID: 'Namba ya Kitambulisho cha Kazi',
      phone: 'Namba ya Simu',
      username: 'Username',
    },
    departments: {
      name: 'Jina',
      description: 'Maelezo',
      createdAt: 'Imetengenezwa',
    },
    users: {
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      workID: 'Namba ya Kitambulisho cha Kazi',
      phone: 'Namba ya Simu',
      username: 'Username',
      formattedStatus: 'Status',
      formattedRoles: 'Roles',
      formattedDepartments: 'Idara',
    },
    department: {
      name: 'Jina',
      description: 'Maelezo',
      formattedStatus: 'Hali',
      createdAt: 'Imetengenezwa',
    },
  },
  forms: {
    scripts: {
      name: 'Jina',
      version: 'Toleo',
      creator: 'Muumba',
      excelFile: 'Hamisha Faili',
      reports: 'Ripoti',
      repositoryLink: 'Kiungo Cha Hifadhi',
    },
    createReportForm: {
      reportName: 'Jina la Ripoti',
      description: 'Maelezo',
      resources: 'Rasilimali',
      url: 'URL Ya Zana Ya Kuripoti',
      appName: 'App Jina',
      repositoryLink: 'Kiungo cha Hifadhi',
      reportStatus: 'Hali ya Ripoti',
      anonymus: 'Anonymus',
      roles: 'Majukumu',
    },
    changePassword: {
      newPassword: 'Ingiza Neno siri Jipya',
      newPasswordConfirmation: 'Rudia neno siri',
    },
    changeUserPassword: {
      currentPassword: 'Ingiza Neno siri la sasa',
      newPassword: 'Ingiza Neno siri Jipya',
      newPasswordConfirmation: 'Rudia neno siri',
    },
    userProfile: {
      username: 'Login Username',
      workID: 'Kitambulisho cha mfanyakazi',
      email: 'Barua pepe',
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      phone: 'Namba ya Simu',
      password: 'Neno siri',
      passwordConfirmation: 'Rudia neno siri',
    },
    userProfileEdit: {
      username: 'Login Username',
      workID: 'Kitambulisho cha mfanyakazi',
      email: 'Barua pepe',
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la Kati',
      lastName: 'Jina la Mwisho',
      phone: 'Namba ya Simu',
    },
    userRolesPermissions: {
      roleId: 'User Role',
    },
    patients: {
      patientInformation: 'Taarifa za Mgonjwa',
      firstName: 'Jina la Kwanza',
      middleName: 'Jina la kati',
      lastName: 'Jina la Mwisho',
      id: 'Namba ya hosipitali',
      birthDate: 'Tarehe ya Kuzaliwa',
      gender: 'Jinsia',
      department: 'Idara',
      patientAddress: 'Taarifa za Makazi',
      street: 'Jina la Mtaa',
      addressNumber: 'Namba ya Mtaa',
      addressApartment: 'Namba ya Nyumba',
      addressPlace: 'Mahali',
      addressPostalCode: 'Sanduku la Posta',
      addressCountryCode: 'Nchi',
      patientContact: 'Mawasiliano ya mgonjwa',
      email: 'Barua pepe',
      phone: 'Namba ya simu',
      phone2: 'Namba ya ziada',
      relation: 'Uhusiano na Mgonjwa',
      number: 'Nambari',
      apartment: 'Ghorofa',
      place: 'Mahali',
      postalCode: 'Msimbo wa Posta',
      country: 'Taifa',
      emergency: 'Mawasiliano ya dharula',
      note: 'Kumbuka',
      addCaregiver: 'Ongeza Mlezi',
    },
  },
  assessmentForm: {
    license: 'Leseni: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} imejibiwa',
    optionalAnswered: '+{{actual}} ya hiari',
    fillingTime: 'Muda wa kujaza: dk {{time}}',
    completeAssessment: 'Kamilisha tathmini',
    alreadyCompleted: 'Tathmini imekamilika',
    overview: 'Maelezo ya Jumla',
    next: 'Ifuatayo',
    prev: 'Iliyotangulia',
    complete: 'Asante kwa kumaliza tathmini hii! Unaweza kufunga ukurasa huu sasa.',
  },
  questionnaires: {
    id: 'ID',
    name: 'Jina',
    formattedStatus: 'Hali',
    language: 'Lugha',
    abbreviation: 'Ufupisho',
    keywords: 'Maneno Muhimu',
    timeToComplete: 'Muda Wa Kukamilisha',
    copyright: 'Hakimiliki',
    website: 'Tovuti',
    license: 'Leseni',
    createdAt: 'Imeundwa Katika',
  },
  questionnairesForm: {
    name: 'Jina',
    excelFile: 'Excel Faili',
    status: 'Hali',
    language: 'Lugha',
    copyright: 'Hakimiliki',
    timeToComplete: 'Muda Wa Kukamilisha (dakika)',
    website: 'Tovuti',
    license: 'Leseni',
    keywords: 'Maneno Muhimu',
  },
  plannedAssessments: {
    name: 'Jina',
    formattedStatus: 'Hali',
    patientMedicalRecordNo: 'Kitambulisho cha Hospitali cha Mgonjwa',
    formattedPatient: 'Mgonjwa',
    clinicianWorkId: 'Kitambulisho cha Kazi cha Daktari',
    formattedClinician: 'Daktari wa kliniki',
    informant: 'Mtoa taarifa',
    createdAt: 'Imetengenezwa',
  },
  planAssessment: {
    assessmentName: 'Jina la Tathmini',
    patient: 'Mgonjwa',
    clinician: 'Daktari wa kliniki',
    informant: 'Mtoa taarifa',
  },
  form: {
    system: {
      systemLocale: 'Weka Eneo la Mfumo',
      systemTimezone: 'Weka Eneo la Saa la Mfumo',
      dateFormat: 'Weka Umbizo la Tarehe',
      timeFormat: 'Weka Umbizo la Wakati',
      passwordLifeTimeInDays: 'Muda wa ukomo ya Nenosiri (Katika Siku)',
      passwordReUseCutoffInDays: 'Muda wa ukomo wa kurudia neno siri (Katika Siku)',
      maxLoginAttempts: 'Ukomo wa majaribio ya kuingia',
    },
  },
};
