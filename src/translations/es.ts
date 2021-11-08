export default {
  dashboard: {
    welcome: 'Bienvenido/a a MHIRA',
  },
  menu: {
    dashboard: 'Panel de Control',
    caseManagement: 'Gestión de Casos',
    patientList: 'Lista de Pacientes',
    createPatient: 'Crear Paciente Nuevo',
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
      createdAt: 'Creado en',
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
  },
  forms: {
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
      emergencyContacts: 'Contacto de Emergencia',
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
};