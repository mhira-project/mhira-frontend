export default {
  core: {
    assessments: 'Testungen',
    profile: 'Profil',
    caseManagers: 'Case Manager',
    departments: 'Abteilungen',
    caregivers: 'Betreuer',
    reports: 'Berichte',
    previous: 'Vorherige',
    next: 'Nächste',
    reset: 'Zurücksetzen',
    search: 'Suchen',
    editCaregiver: 'Betreuer bearbeiten',
    createCaregiver: 'Betreuer erstellen',
    questionnaire: 'Fragebogen',
    scripts: 'Scripts',
  },
  dashboard: {
    welcome: 'Willkommen in MHIRA',
    name: 'MHIRA',
    header: 'Wählen Sie den Bericht aus:',
  },
  assessments: {
    myAssessment: 'Meine Abklärungen',
  },
  card: {
    changePassword: 'Passwort ändern',
    profile: 'Benutzerprofil',
    logout: 'MHIRA verlassen',
  },
  questionnaireSelection: {
    noResult: 'Keine Fragebögen gefunden',
    searchSelect: 'Suchen und wählen Sie Fragebögen aus, die Sie der Bewertung hinzufügen möchten',
    selectQuestionnaires: 'Wählen Sie Fragebögen aus',
  },
  assessmentMessages: {
    expiredText: 'Bewertung ist leider nicht mehr verfügbar!',
    plannedText: 'Entschuldigung, Bewertung ist nicht verfügbar! Es wird erhältlich sein unter:',
    completedText: 'Diese Bewertung ist abgeschlossen!',
  },

  menu: {
    dashboard: 'Dashboard',
    createAssessment: 'Neue Abklärung erstellen',
    caseManagement: 'Fälle',
    patientList: 'Patientenliste',
    createPatient: 'Patient erstellen',
    caregiverList: 'Betreuer',
    questionnaires: 'Fragebögen',
    questionnairesList: 'Fragebogenliste',
    uploadQuestionnaire: 'Fragebogen hochladen',
    questionnairesVersionList: 'Alte Versionen',
    assessments: 'Abklärungen',
    planAssessment: 'Abklärungen planen',
    plannedAssessments: 'Bestehende Abklärungen',
    userManagement: 'Benutzerverwaltung',
    listUsers: 'Benutzerliste',
    newUser: 'Benutzer erstellen',
    administration: 'Administration',
    reports: 'Berichte',
    createReport: 'Bericht verlinken',
    permissionMatrix: 'Berechtigungs-Matrix',
    permissions: 'Berechtigungen',
    roles: 'Rollen',
    departments: 'Abteilungen',
    settings: 'Einstellungen',
    systemConfiguration: 'System-Einstellungen',
    patientStatuses: 'Patientenstatus',
    notFound: 'Nicht gefunden',
    noTabs: 'Keine Registerkarten',
    disclaimers: 'Mitteilungen',
  },
  patients: {
    myPatients: 'Meine Patienten',
  },
  tables: {
    assessmentAdministration: {
      assessmentType: 'Bewertungstyp',
      lastUpdate: 'Letztes Update',
      status: 'Status',
    },
    disclaimer: {
      type: 'Art',
      textInformation: 'Aussage',
      lastUpdate: 'Letztes Update',
    },
    assessmentsPatients: {
      title: 'Titel',
      manager: 'Verwalter',
      informant: 'Informant',
      questionnaires: 'Fragebögen',
      deliveryDate: 'Aktivierungsdatum',
      expirationDate: 'Ablaufdatum',
      updatedAt: 'Abgabetermin',
      status: 'Status',
    },
    scripts: {
      name: 'Name',
      version: 'Version',
      creator: 'Erstellt von',
      reports: 'Berichte',
      repositoryLink: 'Repository',
    },
    reports: {
      name: 'Name',
      resources: 'Berichtstyp',
      roles: 'Rollen',
      status: 'Status',
      repositoryLink: 'Repository',
      createdAt: 'Erstellungsdatum',
    },
    patients: {
      firstName: 'Vorname',
      middleName: 'Zweitname',
      lastName: 'Nachname',
      medicalRecordNo: 'ID',
      gender: 'Geschlecht',
      birthDate: 'Geburtsdatum',
      status: 'Status',
      informants: 'Informanten',
      caseManager: 'Fallführende',
      createdAt: 'Erstellt am',
    },
    contact: {
      firstName: 'Vorname',
      middleName: 'Zweitname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      relation: 'Beziehung zum Patienten',
      emergency: 'Notfallkontakt',
      note: 'Bemerkung',
      patients: 'Patient',
    },
    casemanagers: {
      firstName: 'Vorname',
      middleName: 'Zweitnamen',
      lastName: 'Nachname',
      workID: 'Mitarbeiter ID',
      phone: 'Telefon',
      username: 'Benutzername',
    },
    departments: {
      name: 'Name',
      description: 'Beschreibung',
      createdAt: 'Erstellt am',
    },
    users: {
      firstName: 'Vorname',
      middleName: 'Zweitnamen',
      lastName: 'Nachname',
      workID: 'Mitarbeiter ID',
      phone: 'Telefon',
      username: 'Benutzername',
      formattedStatus: 'Status',
      formattedRoles: 'Rollen',
      formattedDepartments: 'Abteilungen',
    },
    department: {
      name: 'Abteilung',
      description: 'Beschreibung',
      formattedStatus: 'Status',
      createdAt: 'Erstellt am',
      departmentName: 'Abteilungsname',
      status: 'Status',
    },
  },
  forms: {
    assessmentAdministration: {
      nameType: 'Modellname',
      status: 'Status',
    },
    patientStatuses: {
      name: 'Patientenstatus',
      description: 'Beschreibung',
    },
    scripts: {
      name: 'Name',
      version: 'Ausführung',
      creator: 'Erstellt von',
      reports: 'Berichte',
      excelFile: 'Exportdatei',
      repositoryLink: 'Repository',
    },
    createReportForm: {
      reportName: 'Berichtsname',
      description: 'Beschreibung',
      resources: 'Ressourcen',
      url: 'URL Des Berichtstools',
      appName: 'App Name',
      repositoryLink: 'Repository-Link',
      reportStatus: 'Berichtsstatus',
      anonymus: 'Anonymus',
      roles: 'Rollen',
    },
    changePassword: {
      newPassword: 'Neues Passwort eingeben',
      newPasswordConfirmation: 'Passwort wiederholen',
    },
    changeUserPassword: {
      currentPassword: 'Aktuelles Passwort eingeben',
      newPassword: 'Neues Passwort eingeben',
      newPasswordConfirmation: 'Passwort wiederholen',
    },
    userProfile: {
      username: 'Benutzername',
      workID: 'Mitarbeiter ID',
      email: 'E-Mail',
      firstName: 'Vorname',
      middleName: 'Zweitnamen',
      lastName: 'Nachname',
      phone: 'Telefon',
      password: 'Passwort',
      passwordConfirmation: 'Passwort wiederholen',
    },
    userProfileEdit: {
      username: 'Benutzername',
      workID: 'Mitarbeiter ID',
      email: 'E-Mail',
      firstName: 'Vorname',
      middleName: 'Zweitname',
      lastName: 'Nachname',
      phone: 'Telefon',
    },
    userRolesPermissions: {
      roleId: 'Rolle',
    },
    patients: {
      patientInformation: 'Patientenprofil',
      firstName: 'Vorname',
      middleName: 'Zweitnamen',
      lastName: 'Nachname',
      id: 'Patienten ID',
      birthDate: 'Geburtsdatum',
      gender: 'Geschlecht',
      department: 'Abteilung',
      patientAddress: 'Adresse',
      street: 'Strasse',
      addressNumber: 'Hausnummer',
      addressApartment: 'Apartment',
      addressPlace: 'Ort',
      addressPostalCode: 'Postleitzahl',
      addressCountryCode: 'Land',
      patientContact: 'Kontaktdaten',
      email: 'E-Mail Adresse',
      phone: 'Telefon',
      phone2: 'Telefon (alternativ)',
      relation: 'Beziehung zum Patienten',
      number: 'Number',
      apartment: 'Wohnung',
      place: 'Platz',
      postalCode: 'Postleitzahl',
      country: 'Land',
      emergency: 'Notfallkontakt',
      note: 'Hinweis',
      addCaregiver: 'Betreuer Hinzufügen',
    },
  },
  assessmentForm: {
    license: 'Lizenz: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} beantwortet',
    optionalAnswered: '+{{actual}} optional',
    fillingTime: 'Dauer: {{time}}min',
    completeAssessment: 'Einschätzung abschliessen',
    alreadyCompleted: 'Einschätzung ist abgeschlossen',
    overview: 'Übersicht',
    next: 'Weiter',
    prev: 'Zurück',
    complete: 'Danke für das Ausfüllen der Einschätzung. Die Seite kann jetzt geschlossen werden.',
  },
  questionnaires: {
    questionnairesId: 'Versions-ID',
    id: 'ID',
    name: 'Name',
    formattedStatus: 'Status',
    language: 'Sprache',
    abbreviation: 'Abkürzung',
    keywords: 'Schlüsselwörter',
    timeToComplete: 'Zeit zum Abschluss',
    copyright: 'Urheberrechte ©',
    website: 'Webseite',
    license: 'Lizenz',
    createdAt: 'Erstellt am',
  },
  questionnairesForm: {
    name: 'Name',
    excelFile: 'Excel-Datei',
    status: 'Status',
    language: 'Sprache',
    copyright: 'Urheberrechte ©',
    timeToComplete: 'Zeit bis zum Abschluss (Minuten)',
    website: 'Webseite',
    license: 'Lizenz',
    keywords: 'Schlüsselwörter',
  },
  plannedAssessments: {
    name: 'Name',
    formattedStatus: 'Status',
    patientMedicalRecordNo: 'Patienten ID',
    formattedPatient: 'Patient',
    clinicianWorkId: 'Mitarbeiter ID',
    formattedClinician: 'Kliniker',
    informant: 'Informant',
    createdAt: 'Hergestellt am',
    deliveryDate: 'Aktivierungsdatum',
    updatedAt: 'Abgabetermin',
    expirationDate: 'Ablaufdatum',
  },
  planAssessment: {
    assessmentName: 'Name der Einschätzung',
    patient: 'Wählen Sie den Patienten aus, zu dem diese Bewertung gehört',
    clinician: 'Kliniker',
    informant: 'Informant',
  },
  createAssessment: {
    title: 'Titel',
    assessmentManager: 'Bewertungsmanager',
    patient: 'Geduldig',
    departmentsUser: `Benutzer der Abteilung`,
    patientsCaregiver: `Betreuer des Patienten`,
    deliveryDate: 'Aktivierungsdatum',
    expirationDate: 'Ablaufdatumkeitsdatum',
    notes: 'Hinweise für den Verwalter',
  },
  form: {
    system: {
      systemLocale: 'Systemgebietsschema festlegen',
      systemTimezone: 'Systemzeitzone einstellen',
      dateFormat: 'Datumsformat einstellen',
      timeFormat: 'Zeitformat einstellen',
      passwordLifeTimeInDays: 'Passwortlebensdauer (in Tagen)',
      passwordReUseCutoffInDays: 'Passwort-Wiederverwendung verbieten während (Tage)',
      maxLoginAttempts: 'Maximale Anmeldeversuche',
    },
  },
  caregiver: {
    patient: 'Patient',
    birthDate: 'Geburtsdatum',
    medicalRecordNumber: 'Krankenaktennummer',
    relationToPatient: 'Beziehung zum Patienten',
    nonExistingCaregiver: 'Fügen Sie eine noch nicht registrierte Betreuer hinzu:',
    existingCaregiver: 'Suche nach bestehender Betreuer',
    searchCaregiver: 'Suchen Sie nach der Nummer oder dem Namen einer bereits registrierten Betreuers',
    add: 'HINZUFÜGEN',
    newCaregiver: 'Neuer Betreuer ',
  },
  rolesPermissions: {
    permissions: 'Berechtigungen',
    roles: 'Rollen',
  },
};
