// src/screens/SettingsScreen/constants.ts

// Keys para AsyncStorage
export const STORAGE_KEYS = {
    NOTIFICATIONS_ENABLED: 'resh_notifications_enabled',
    REMINDER_TIME: 'resh_reminder_time',
    SECURITY_ENABLED: 'resh_security_enabled',
    EXPORT_FORMAT: 'resh_export_format',
    QUOTES_ENABLED: 'resh_quotes_enabled',
    QUOTES_FREQUENCY: 'resh_quotes_frequency',
    LAST_QUOTE_TIME: 'RESH_LAST_QUOTE_TIME'
  };
  
  // Opciones de frecuencia de citas motivacionales
  export const QUOTE_FREQUENCIES = [
    { label: 'EVERY SESSION', value: 0 },
    { label: 'EVERY 3 HOURS', value: 3 },
    { label: 'EVERY 12 HOURS', value: 12 },
    { label: 'DAILY', value: 24 },
    { label: 'NEVER', value: -1 }
  ];
  
  // Opciones de formatos de exportación
  export const EXPORT_FORMATS = ['json', 'csv'];
  
  // Opciones de idioma
  export const LANGUAGE_OPTIONS = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }
  ];