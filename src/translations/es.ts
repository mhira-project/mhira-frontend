export default {
  core: {
    assessments: 'Evaluaciones',
    profile: 'Perfil',
    caseManagers: 'Administradores del Caso',
    departments: 'Departamentos',
    caregivers: 'Cuidadores',
    reports: 'Informes',
    previous: 'Anterior',
    next: 'Siguiente',
    reset: 'Restablecer',
    search: 'Buscar',
    editCaregiver: 'Editar Cuidador',
    createCaregiver: 'Crear Cuidador',
    questionnaire: 'Cuestionario',
    scripts: 'Scripts',
  },
  dashboard: {
    welcome: 'Bienvenido/a a MHIRA',
    name: 'MHIRA',
    header: 'Seleccione el informe que desea generar:',
  },
  assessments: {
    myAssessment: 'Mi Evaluación',
    archivedAssessments: 'Mostrar Evaluaciones Archivadas',
    notArchivedAssessments: 'Mostrar Evaluaciones No Archivadas',
  },
  card: {
    changePassword: 'Cambiar la Contraseña',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
  },
  questionnaireSelection: {
    noResult: 'Sin Resultados',
    searchSelect: 'Buscar y seleccionar cuestionarios para agregar a la evaluación',
    selectQuestionnaires: 'Seleccionar Cuestionarios',
    selectedQuestionnaires: 'Cuestionarios Seleccionados',
  },
  assessmentMessages: {
    expiredText: 'Lo sentimos, ¡la evaluación ya no está disponible!',
    plannedText: 'Lo sentimos, ¡la evaluación no está disponible! Estará disponible en:',
    completedText: '¡Esta evaluación ha sido completada!',
  },
  menu: {
    dashboard: 'Panel de Control',
    createAssessment: 'Crear Evaluación',
    caseManagement: 'Gestión de Casos',
    patientList: 'Lista de Pacientes',
    createPatient: 'Crear Paciente Nuevo',
    caregiverList: 'Lista de Cuidadores',
    questionnaires: 'Cuestionarios',
    questionnairesList: 'Lista de Cuestionarios',
    uploadQuestionnaire: 'Cargar Cuestionario Nuevo',
    questionnairesVersionList: 'Versiones Antiguas',
    assessments: 'Evaluaciones',
    planAssessment: 'Crear una Evaluación',
    plannedAssessments: 'Evaluaciones Planificadas',
    userManagement: 'Configuración de Usuarios',
    listUsers: 'Lista de Usuarios',
    newUser: 'Nuevo Usuario',
    administration: 'Administración',
    reports: 'Informes',
    createReport: 'Crear Informe',
    permissionMatrix: 'Permisos de Usuarios',
    permissions: 'Permisos',
    roles: 'Roles',
    departments: 'Departamentos',
    settings: 'Ajustes',
    systemConfiguration: 'Ajustes del Sistema',
    patientStatuses: 'Estado del Paciente',
    notFound: 'No encontrado',
    noTabs: 'No hay Pestaña',
    disclaimers: 'Mensajes',
    emailTemplates: 'Modelos de Email',
    version: 'Versión',
  },
  patients: {
    myPatients: 'Mis Pacientes',
    archivedPatients: 'Mostrar Pacientes Archivados',
    notArchivedPatients: 'Mostrar Pacientes No Archivados'
  },
  tables: {
    assessmentAdministration: {
      assessmentType: 'Tipo de Evaluación',
      lastUpdate: 'Última Actualización',
      status: 'Estado',
    },
    disclaimer: {
      type: 'Tipo',
      textInformation: 'Información de Texto',
      lastUpdate: 'Última Actualización',
    },
    assessmentsPatients: {
      title: 'Título',
      manager: 'Administrador',
      informant: 'Informante',
      questionnaires: 'Cuestionarios',
      deliveryDate: 'Fecha de Entrega',
      expirationDate: 'Fecha de Expiración',
      updatedAt: 'Día de Entrega',
      status: 'Estado',
    },
    scripts: {
      name: 'Name',
      version: 'Versión',
      creator: 'Creador',
      reports: 'Informes',
      repositoryLink: 'Enlace del Repositorio',
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
      departmentName: 'Nombre de Departamento',
      status: 'Estado',
    },
  },
  forms: {
    assessmentAdministration: {
      typeName: 'Escribe un Nombre',
      status: 'Estado',
    },
    patientStatuses: {
      name: 'Nombre',
      description: 'Descripción',
    },
    scripts: {
      name: 'Name',
      version: 'Versión',
      creator: 'Creador',
      reports: 'Informes',
      excelFile: 'Exportar Archivo',
      repositoryLink: 'Enlace Del Repositorio',
    },
    createReportForm: {
      reportName: 'Nombre Informe',
      description: 'Descripción',
      resources: 'Recursos',
      url: 'URL De La Herramienta De Informes',
      appName: 'Nombre App',
      repositoryLink: 'Enlace del Repositorio',
      reportStatus: 'Estado del Informe',
      anonymus: 'Anónimo',
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
      workID: 'ID o RUT',
      email: 'E-Mail',
      firstName: 'Nombre',
      middleName: 'Segundo Nombre',
      lastName: 'Apellidos',
      phone: 'Teléfono',
      password: 'Contraseña',
      passwordConfirmation: 'Repita su Contraseña',
    },
    userProfileEdit: {
      username: 'Nombre de Usuario',
      workID: 'ID o RUT',
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
      id: 'Ficha o RUT',
      birthDate: 'Fecha de Nacimiento',
      gender: 'Sexo',
      department: 'Departamento',
      patientAddress: 'Dirección del Paciente',
      street: 'Calle',
      addressNumber: 'Número',
      addressApartment: 'Departamento/Casa',
      addressPlace: 'Comuna',
      addressPostalCode: 'Código Postal',
      addressCountryCode: 'País',
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
    questionnairesId: 'Identificación de la versión',
    id: 'ID',
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
    discardedTitle: '¿Está seguro de que desea eliminar este cuestionario?',
    discardedMessage: `<p>Por favor, tenga en cuenta las siguientes consecuencias:</p>
    <ol>
      <li><b>Nuevas pruebas</b>: El cuestionario eliminado no estará disponible para futuras pruebas.</li>
      <li><b>Acceso a datos</b>: Los datos recopilados con el cuestionario ahora eliminado seguirán siendo accesibles.</li>
      <li><b>Ajustes de informes</b>: Los informes que incluyen el cuestionario eliminado todavía pueden ser modificados.</li>
      <li><b>Sección de archivo</b>: El cuestionario eliminado se trasladará a la sección "Versiones antiguas", donde aún podrá ser editado.</li>
      <li><b>Opción de reemplazo</b>: Tras la eliminación, tendrá la opción de crear un nuevo cuestionario con la misma abreviatura y en el mismo idioma.</li>
    </ol>`,
    continueButton: 'Continuar',
    cancelButton: 'Cancelar'
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
    patientMedicalRecordNo: 'Número de Ficha o RUT',
    formattedPatient: 'Paciente',
    submissionDate: 'Fecha de envío',
    emailStatus: 'Estado del email',
    clinicianWorkId: 'ID del tratante o RUT',
    formattedClinician: 'Tratante',
    informant: 'Informante',
    createdAt: 'Creado en',
    expirationDate: 'Fecha de Expiración',
    updatedAt: 'Día de Entrega',
    deliveryDate: 'Fecha de Entrega',
  },
  planAssessment: {
    assessmentName: 'Nombre de la Evaluación',
    patient: 'Seleccione el paciente al que pertenece esta evaluación',
    clinician: 'Tratante',
    informant: 'Tipo de Informante',
  },
  createAssessment: {
    title: 'Título',
    assessmentManager: 'Encargado de la Evaluación',
    patient: 'Paciente',
    departmentsUser: `Usuario del Departamento`,
    patientsCaregiver: `Cuidador del Paciente`,
    deliveryDate: 'Fecha de entrega',
    expirationDate: 'Fecha de Expiración',
    notes: 'Notas para el encargado de la evaluación',
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
  caregiver: {
    patient: 'Paciente',
    birthDate: 'Fecha de nacimiento',
    medicalRecordNumber: 'Numero de ficha clínica',
    relationToPatient: 'Relación con el paciente',
    nonExistingCaregiver: 'Agregar un cuidador no existente:',
    existingCaregiver: 'Buscar cuidador existente',
    searchCaregiver: 'Buscar número o nombre de cuidador existente',
    add: 'AGREGAR',
    newCaregiver: 'Nuevo Cuidador',
  },
  rolesPermissions: {
    permissions: 'Permisos',
    roles: 'Roles',
  },
  emailTemplates:{
    createTemplate: 'Crear Modelo de Email',
    created: '¡Modelo de email creado exitosamente!',
    updated: '¡Modelo de email actualizado exitosamente!',
    deleted: '¡Modelo de email borrado exitosamente!',
    unableToLoad: 'No se puede cargar modelo de email',
    name: 'Nombre',
    body: 'Cotenido',
    subject: 'Asunto',
    status: 'Estado',
    module: 'Módulo'
  },
  emailStatusFilter:{
    expired: 'Expirado',
    planned: 'Planificado',
    pending: 'Pendiente',
    openForCompletion: 'Abierto para completar',
    partiallyCompleted: 'Parcialmente completado',
    completed: 'Completado'
  },
  modal: {
    continue: '¿Vaya a la siguiente sección?',
    continueOverview: '¿Salir del cuestionario?',
    unansweredQuestions: 'Usted ha dejado {{count}} preguntas sin responder. Todas las preguntas deben responderse para enviar el cuestionario.',
    unansweredQuestionsOverview: "Tienes {{count}} preguntas obligatorias sin respuesta. ¿Estás seguro de que quieres completar el cuestionario?",
    cancel: "Continuar sin completar las preguntas que faltan (No recomendado)",
    ok: "Vuelva a completar las preguntas que faltan"
  }
};
