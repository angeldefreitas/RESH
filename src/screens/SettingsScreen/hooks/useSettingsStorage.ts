// src/screens/SettingsScreen/hooks/useSettingsStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '../constants';
import { loadLanguage, changeLanguage } from '../../../utils/i18n';

export const useSettingsStorage = () => {
  const { t } = useTranslation();
  
  // Estados para la configuración
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [securityEnabled, setSecurityEnabled] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('json');
  const [reminderTime, setReminderTime] = useState<string>('21:00');
  const [currentLanguage, setCurrentLanguage] = useState<string>('es');
  const [quotesEnabled, setQuotesEnabled] = useState<boolean>(true);
  const [quotesFrequency, setQuotesFrequency] = useState<number>(3); // Default: 3 hours

  // Cargar configuración al iniciar
  useEffect(() => {
    loadSettings();
  }, []);

  // Función para cargar la configuración guardada
  const loadSettings = async () => {
    try {
      const notificationsEnabled = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
      const securityEnabled = await AsyncStorage.getItem(STORAGE_KEYS.SECURITY_ENABLED);
      const exportFormat = await AsyncStorage.getItem(STORAGE_KEYS.EXPORT_FORMAT);
      const reminderTime = await AsyncStorage.getItem(STORAGE_KEYS.REMINDER_TIME);
      const language = await loadLanguage();
      const quotesEnabled = await AsyncStorage.getItem(STORAGE_KEYS.QUOTES_ENABLED);
      const quotesFrequency = await AsyncStorage.getItem(STORAGE_KEYS.QUOTES_FREQUENCY);
      
      setNotificationsEnabled(notificationsEnabled === 'true');
      setSecurityEnabled(securityEnabled === 'true');
      setExportFormat(exportFormat || 'json');
      setReminderTime(reminderTime || '21:00');
      setCurrentLanguage(language);
      setQuotesEnabled(quotesEnabled !== 'false'); // Default to true
      setQuotesFrequency(quotesFrequency ? parseInt(quotesFrequency) : 3);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Función para guardar cambios de configuración
  const saveSetting = async (key: string, value: string): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error saving setting (${key}):`, error);
      return false;
    }
  };

  // Handlers para cada tipo de configuración
  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await saveSetting(STORAGE_KEYS.NOTIFICATIONS_ENABLED, value ? 'true' : 'false');
    
    if (value) {
      // Lógica para solicitar permisos de notificación
      Alert.alert(
        t('notificationsEnabled'),
        t('notificationsEnabledDescription')
      );
    }
  };

  const handleToggleSecurity = async (value: boolean) => {
    setSecurityEnabled(value);
    await saveSetting(STORAGE_KEYS.SECURITY_ENABLED, value ? 'true' : 'false');
    
    if (value) {
      // Lógica para configurar seguridad biométrica/PIN
      Alert.alert(
        t('securityEnabled'),
        t('securityEnabledDescription')
      );
    }
  };

  const handleToggleQuotes = async (value: boolean) => {
    setQuotesEnabled(value);
    await saveSetting(STORAGE_KEYS.QUOTES_ENABLED, value ? 'true' : 'false');
    
    // Si se habilitan las citas, borrar el tiempo de la última cita para mostrar una inmediatamente
    if (value) {
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_QUOTE_TIME);
    }
  };

  const handleSelectQuoteFrequency = async (frequency: number) => {
    setQuotesFrequency(frequency);
    await saveSetting(STORAGE_KEYS.QUOTES_FREQUENCY, frequency.toString());
    
    // Borrar el tiempo de la última cita para reiniciar el temporizador
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_QUOTE_TIME);
  };

  const handleSelectExportFormat = async (format: string) => {
    setExportFormat(format);
    await saveSetting(STORAGE_KEYS.EXPORT_FORMAT, format);
  };

  const handleSetReminderTime = async (time: string) => {
    setReminderTime(time);
    await saveSetting(STORAGE_KEYS.REMINDER_TIME, time);
  };

  const handleChangeLanguage = async (language: string) => {
    await changeLanguage(language);
    setCurrentLanguage(language);
  };

  return {
    // Estados
    notificationsEnabled,
    securityEnabled,
    exportFormat,
    reminderTime,
    currentLanguage,
    quotesEnabled,
    quotesFrequency,
    
    // Funciones
    handleToggleNotifications,
    handleToggleSecurity,
    handleToggleQuotes,
    handleSelectQuoteFrequency,
    handleSelectExportFormat,
    handleSetReminderTime,
    handleChangeLanguage,
  };
};