// src/utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import es from '../translations/es';
import pt from '../translations/pt';
import en from '../translations/en';

// Clave para AsyncStorage
const LANGUAGE_STORAGE_KEY = 'resh_language';

// Función para guardar el idioma seleccionado
export const saveLanguage = async (language: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    return true;
  } catch (error) {
    console.error('Error al guardar el idioma:', error);
    return false;
  }
};

// Función para cargar el idioma guardado
export const loadLanguage = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language || 'en'; // Por defecto inglés si no hay idioma guardado
  } catch (error) {
    console.error('Error al cargar el idioma:', error);
    return 'en'; // Por defecto inglés en caso de error
  }
};

// Función para cambiar el idioma en tiempo real
export const changeLanguage = async (language: string): Promise<any> => {
  await saveLanguage(language);
  return i18n.changeLanguage(language);
};

// Inicializar i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      es: { translation: es },
      pt: { translation: pt },
      en: { translation: en }
    },
    lng: 'en', // Idioma por defecto (ahora inglés)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Cargar el idioma guardado al iniciar
loadLanguage().then(language => {
  i18n.changeLanguage(language);
});

export default i18n;