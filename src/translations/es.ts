// src/translations/es.ts
export default {
  appName: 'RESH',
  appFullName: 'Rastreador Estúpidamente Simple de Hábitos',
  
  // Pantalla principal
  habitsList: 'LISTA DE HÁBITOS',
  activityLog: 'REGISTRO DE ACTIVIDAD',
  noActiveHabits: 'SIN HÁBITOS ACTIVOS',
  addFirstHabit: 'Presiona el botón + para añadir tu primer hábito',
  loadingHabits: 'CARGANDO HÁBITOS...',
  filterByHabit: 'FILTRAR POR HÁBITO:',
  all: 'TODOS',
  calendarInstructions: 'TOCA CUALQUIER DÍA DEL CALENDARIO PARA MARCAR TUS HÁBITOS DIRECTAMENTE.',
  
  // Días de la semana
  weekDays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  
  // Calendario
  completed: 'COMPLETADO',
  partial: 'PARCIAL',
  notCompleted: 'NO COMPLETADO',
  
  // Añadir hábito
  addHabit: 'REGISTRAR NUEVO\nHÁBITO',
  editHabit: 'EDITAR HÁBITO',
  habitName: 'NOMBRE DEL HÁBITO:',
  habitDescription: 'DESCRIPCIÓN (OPCIONAL):',
  habitNamePlaceholder: 'Ej: HACER EJERCICIO',
  habitDescriptionPlaceholder: 'Ej: 30 MINUTOS DE EJERCICIO DIARIO',
  habitColor: 'COLOR',
  habitEmoji: 'EMOJI',
  selectedColor: 'COLOR SELECCIONADO',
  selectedEmoji: 'EMOJI SELECCIONADO',
  preview: 'VISTA PREVIA',
  saveHabit: 'GUARDAR HÁBITO',
  updateHabit: 'ACTUALIZAR HÁBITO',
  cancel: 'CANCELAR',
  habitAddedSuccess: 'HÁBITO AÑADIDO CORRECTAMENTE',
  habitUpdatedSuccess: 'HÁBITO ACTUALIZADO CORRECTAMENTE',
  accept: 'ACEPTAR',
  error: 'ERROR',
  emptyNameError: 'EL NOMBRE DEL HÁBITO NO PUEDE ESTAR VACÍO',
  savingError: 'NO SE PUDO GUARDAR EL HÁBITO',
  genericError: 'OCURRIÓ UN PROBLEMA AL GUARDAR EL HÁBITO',
  saving: 'GUARDANDO...',
  
  // Estadísticas
  stats: 'ANÁLISIS DE DESEMPEÑO',
  calculatingStats: 'CALCULANDO ESTADÍSTICAS...',
  activityReport: 'REPORTE DE ACTIVIDAD',
  totalHabits: 'TOTAL HÁBITOS',
  completedToday: 'COMPLETADOS HOY',
  bestStreak: 'MEJOR RACHA',
  weeklyRate: 'TASA SEMANAL',
  weeklyAnalysis: 'ANÁLISIS SEMANAL',
  habitPerformance: 'RENDIMIENTO POR HÁBITO',
  days: 'DÍAS',
  day: 'DÍA',
  
  // Consejos
  habitsFormationProtocol: 'PROTOCOLO DE FORMACIÓN DE HÁBITOS',
  tips: [
    'EMPIEZA CON OBJETIVOS PEQUEÑOS Y MEDIBLES',
    'MANTÉN CONSISTENCIA A TODA COSTA',
    'UN DIA PERDIDO = DEBILIDAD. NO LO PERMITAS',
    'SI FALLAS, RETOMA INMEDIATAMENTE AL DÍA SIGUIENTE',
    'DISCIPLINA VENCE MOTIVACIÓN'
  ],
  
  // Eliminar hábito
  deleteHabit: 'ELIMINAR HÁBITO',
  deleteConfirmation: '¿ESTÁS SEGURO QUE DESEAS ELIMINAR ESTE HÁBITO?',
  deleteError: 'NO SE PUDO ELIMINAR EL HÁBITO',
  
  // Modal calendario
  habitRegistry: 'REGISTRO DE HÁBITOS:',
  noRegisteredHabits: 'SIN HÁBITOS REGISTRADOS',

  // Pantalla de configuración
  settings: 'CONFIGURACIÓN',
  generalSettings: 'CONFIGURACIÓN GENERAL',
  language: 'IDIOMA',
  notifications: 'NOTIFICACIONES',
  notificationsEnabled: 'NOTIFICACIONES ACTIVADAS',
  notificationsEnabledDescription: 'Recibirás recordatorios diarios para tus hábitos.',
  reminderTime: 'HORA DE RECORDATORIO',
  currentReminderTime: 'Hora actual',
  setReminderTime: 'CONFIGURAR HORA',
  change: 'CAMBIAR',
  appSecurity: 'SEGURIDAD',
  securityEnabled: 'SEGURIDAD ACTIVADA',
  securityEnabledDescription: 'La app requerirá autenticación para acceder.',
  
  dataManagement: 'GESTIÓN DE DATOS',
  exportFormat: 'FORMATO DE EXPORTACIÓN',
  exportData: 'EXPORTAR DATOS',
  exportDataDescription: '¿Deseas exportar todos tus datos de hábitos?',
  export: 'EXPORTAR',
  importData: 'IMPORTAR DATOS',
  importDataDescription: '¿Deseas importar datos? Esto reemplazará tus datos actuales.',
  import: 'IMPORTAR',
  
  dangerZone: 'ZONA DE PELIGRO',
  resetApp: 'RESETEAR APLICACIÓN',
  resetAppWarning: '¡ADVERTENCIA! Esto eliminará TODOS tus datos. Esta acción no se puede deshacer.',
  reset: 'RESETEAR',
  resetComplete: 'RESETEO COMPLETADO',
  resetCompleteDescription: 'Todos los datos han sido eliminados correctamente.',
  resetError: 'No se pudieron eliminar todos los datos.',
  
  about: 'ACERCA DE',
  version: 'VERSIÓN',
  credits: 'CRÉDITOS',
  
  totalTrackedDays: 'DÍAS REGISTRADOS',
  daysCompleted: 'COMPLETADOS',
  daysMissed: 'FALLADOS',
  completionRate: 'TASA DE ÉXITO',
  
  // Reordenamiento de hábitos
  dragToReorder: 'ARRASTRA PARA REORDENAR TUS HÁBITOS',
  done: 'LISTO',
  reorderSavingError: 'ERROR AL GUARDAR EL NUEVO ORDEN',
  // Nuevas traducciones para reordenamiento inline
  reorderMode: 'MODO DE REORDENAMIENTO',
  reorderModeDescription: 'Usa las flechas para reordenar tus hábitos'
};