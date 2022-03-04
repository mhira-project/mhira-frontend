export default {
  dashboard: {
    welcome: 'Bienvenido/a a MHIRA',
    name: 'MHIRA',
  },
  menu: {
    dashboard: 'Panel de Control',
    caseManagement: 'Gestión de Casos',
    patientList: 'Lista de Pacientes',
    createPatient: 'Crear Paciente Nuevo',
    caregiverList: 'Lista de Cuidadores',
    questionnaires: 'Cuestionarios',
    questionnairesList: 'Cuestionarios Disponibles',
    uploadQuestionnaire: 'Cargar un Cuestionario Nuevo',
    assessments: 'Evaluaciones',
    planAssessment: 'Crear una Evaluación',
    plannedAssessments: 'Evaluaciones Planificadas',
    userManagement: 'Configuración de Usuarios',
    listUsers: 'Lista de Usuarios',
    newUser: 'Nuevo Usuario',
    administration: 'Administración',
    reports: 'Informes',
    createReport: 'Crear Reporte',
    permissionMatrix: 'Permisos de Usuarios',
    permissions: 'Permisos',
    roles: 'Roles',
    departments: 'Departamentos',
    settings: 'Ajustes',
    systemConfiguration: 'Ajustes del Sistema',
    patientStatuses: 'Estado del Paciente',
    notFound: 'No encontrado',
    noTabs: 'No hay Pestaña',
  },
  tables: {
    scripts: {
      name: 'Name',
      version: 'Versión',
      creator: 'Creador',
      reports: 'Informes',
      repositoryLink: 'Enlace Del Repositorio',
    },
    reports: {
      name: 'Nombre',
      resources: 'Tipo de Informe',
      roles: 'Roles',
      status: 'Estado',
      repositoryLink: 'Enlace del Repositorio',
      createdAt: 'Creado En',
    },
    patients: {
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      medicalRecordNo: 'Número de Ficha',
      gender: 'Sexo',
      birthDate: 'Fecha de Nacimiento',
      status: 'Estado',
      informants: 'Informantes',
      caseManager: 'Encargado del Caso',
      createdAt: 'Creado En',
    },
    contact: {
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      email: 'E-Mail',
      phone: 'Teléfono',
      relation: 'Relación',
      emergency: 'Emergencia',
      note: 'Nota',
      patients: 'Paciente',
    },
    casemanagers: {
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      workID: 'ID de Usuario o RUT',
      phone: 'Teléfono',
      username: 'Nombre de Usuario',
    },
    departments: {
      name: 'Nombre',
      description: 'Descripción',
      createdAt: 'Creado En',
    },
    users: {
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      workID: 'ID de Usuario o RUT',
      phone: 'Teléfono',
      username: 'Nombre de Usuario',
      formattedStatus: 'Estado',
      formattedRoles: 'Roles',
      formattedDepartments: 'Departamentos',
    },
    department: {
      name: 'Nombre',
      description: 'Descripción',
      formattedStatus: 'Estado',
      createdAt: 'Creado En',
    },
  },
  forms: {
    scripts: {
      name: 'Name',
      version: 'Versión',
      creator: 'Creador',
      reports: 'Informes',
      repositoryLink: 'Enlace Del Repositorio',
    },
    createReportForm: {
      reportName: 'Reportar Nombre',
      description: 'Descripción',
      resources: 'Recursos',
      url: 'URL De La Herramienta De Informes',
      appName: 'App Nombre',
      repositoryLink: 'Enlace del Repositorio',
      reportStatus: 'Estado del Informe',
      anonymus: 'Anonymus',
      roles: 'Roles',
    },
    changePassword: {
      newPassword: 'Ingrese su Nueva Contraseña',
      newPasswordConfirmation: 'Repita su Contraseña',
    },
    changeUserPassword: {
      currentPassword: 'Ingrese su Contraseña Actual',
      newPassword: 'Ingrese su Nueva Contraseña',
      newPasswordConfirmation: 'Repita su Nueva Contraseña',
    },
    userProfile: {
      username: 'Nombre de Usuario',
      workID: 'ID',
      email: 'EMail',
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      phone: 'Teléfono',
      password: 'Contraseña',
      passwordConfirmation: 'Repita su Contraseña',
    },
    userProfileEdit: {
      username: 'Nombre de Usuario',
      workID: 'ID',
      email: 'Email',
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      phone: 'Teléfono',
    },
    userRolesPermissions: {
      roleId: 'User Role',
    },
    patients: {
      patientInformation: 'Información del Paciente',
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      id: 'Id',
      birthDate: 'Fecha de Nacimiento',
      gender: 'Sexo',
      department: 'Departamento',
      patientAddress: 'Dirección del Paciente',
      street: 'Calle',
      addressNumber: 'Número',
      addressApartment: 'Departamento/Casa',
      addressPlace: 'Comuna',
      addressPostalCode: 'Código Postal',
      addressCountryCode: 'Chile',
      patientContact: 'Contacto Paciente',
      email: 'Email',
      phone: 'Teléfono Celular',
      phone2: 'Teléfono Alternativo',
      relation: 'Relación con el/la paciente',
      number: 'Número',
      apartment: 'Departamento',
      place: 'Lugar',
      postalCode: 'Código Postal',
      country: 'País',
      emergency: 'Contacto de Emergencia',
      note: 'Nota',
      addCaregiver: 'Añadir Cuidador',
    },
  },
  assessmentForm: {
    license: 'Licenciamiento: {{license}}',
    questionsAnswered: '{{actual}}/{{total}} contestado',
    optionalAnswered: '+{{actual}} opcional',
    fillingTime: 'Filling time: {{time}}min',
    completeAssessment: 'Enviar Evaluación',
    alreadyCompleted: 'Evaluación Completada',
    overview: 'Resumen',
    next: 'Siguiente',
    prev: 'Anterior',
    complete: '¡Muchas gracias por completar su evaluación! Ahora puede cerrar esta ventana de navegación.',
  },
  questionnaires: {
    name: 'Nombre',
    formattedStatus: 'Estado',
    language: 'Idioma',
    abbreviation: 'Abreviatura',
    keywords: 'Palabras Clave',
    timeToComplete: 'Tiempo Para Completar',
    copyright: 'Derechos De Autor',
    website: 'Sitio Web',
    license: 'licencia',
    createdAt: 'Creado En',
  },
  questionnairesForm: {
    name: 'Nombre',
    excelFile: 'Archivo Excel',
    status: 'Estado',
    language: 'Idioma',
    copyright: 'Derechos De Autor',
    timeToComplete: 'Tiempo Para Completar (minutos)',
    website: 'Sitio Web',
    license: 'Licencia',
    keywords: 'Palabras Clave',
  },
  plannedAssessments: {
    name: 'Nombre',
    formattedStatus: 'Estado',
    patientMedicalRecordNo: 'Identificación Del Hospital Del Paciente',
    formattedPatient: 'Paciente',
    clinicianWorkId: 'ID de trabajo del tratante',
    formattedClinician: 'Tratante',
    informant: 'Informante',
    createdAt: 'Creado en',
  },
  planAssessment: {
    assessmentName: 'Nombre de la Evaluación',
    patient: 'Paciente',
    clinician: 'Tratante',
    informant: 'Informante',
  },
  form: {
    system: {
      systemLocale: 'Establecer configuración regional del sistema',
      systemTimezone: 'Establecer zona horaria del sistema',
      dateFormat: 'Establecer formato de fecha',
      timeFormat: 'Establecer formato de hora',
      passwordLifeTimeInDays: 'Duración de la contraseña (en días)',
      passwordReUseCutoffInDays: 'Corte de reutilización de contraseña (en días)',
      maxLoginAttempts: 'Intentos máximos de inicio de sesión',
    },
  },
};
