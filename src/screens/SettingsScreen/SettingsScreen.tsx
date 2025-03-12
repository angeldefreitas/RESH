// src/screens/SettingsScreen/SettingsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { settingsStyles } from '../../styles/screens/settingsScreen';
import { clearAllData } from '../../utils/storage';
import { useSettingsStorage } from './hooks/useSettingsStorage';
import SettingsSection from './components/SettingsSection';
import SettingsToggle from './components/SettingsToggle';
import SettingsOption from './components/SettingsOption';
import LanguageModal from './modals/LanguageModal';
import QuoteFrequencyModal from './modals/QuoteFrequencyModal';
import { QUOTE_FREQUENCIES } from './constants';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  
  // Estados para modales
  const [languageModalVisible, setLanguageModalVisible] = useState<boolean>(false);
  const [quotesModalVisible, setQuotesModalVisible] = useState<boolean>(false);
  
  // Hook personalizado para gestionar el almacenamiento de configuración
  const {
    notificationsEnabled,
    securityEnabled,
    exportFormat,
    reminderTime,
    currentLanguage,
    quotesEnabled,
    quotesFrequency,
    handleToggleNotifications,
    handleToggleSecurity,
    handleToggleQuotes,
    handleSelectQuoteFrequency,
    handleSelectExportFormat,
    handleSetReminderTime,
    handleChangeLanguage,
  } = useSettingsStorage();

  // Obtener texto de frecuencia de citas motivacionales
  const getQuoteFrequencyText = (frequency: number): string => {
    const option = QUOTE_FREQUENCIES.find(opt => opt.value === frequency);
    return option ? option.label : QUOTE_FREQUENCIES[1].label;
  };

  // Manejadores de acciones
  const handleExportData = () => {
    Alert.alert(
      t('exportData'),
      t('exportDataDescription'),
      [
        { text: t('export'), onPress: () => console.log('Export data in format', exportFormat) },
        { text: t('cancel'), style: 'cancel' }
      ]
    );
  };

  const handleImportData = () => {
    Alert.alert(
      t('importData'),
      t('importDataDescription'),
      [
        { text: t('import'), onPress: () => console.log('Import data') },
        { text: t('cancel'), style: 'cancel' }
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      t('resetApp'),
      t('resetAppWarning'),
      [
        { 
          text: t('reset'), 
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllData();
            if (success) {
              Alert.alert(
                t('resetComplete'),
                t('resetCompleteDescription'),
                [{ text: t('accept') }]
              );
            } else {
              Alert.alert(
                t('error'),
                t('resetError'),
                [{ text: t('accept') }]
              );
            }
          } 
        },
        { text: t('cancel'), style: 'cancel' }
      ]
    );
  };

  const onSelectLanguage = async (language: string) => {
    await handleChangeLanguage(language);
    setLanguageModalVisible(false);
  };

  const onSelectQuoteFrequency = async (frequency: number) => {
    await handleSelectQuoteFrequency(frequency);
    setQuotesModalVisible(false);
  };

  return (
    <ScrollView style={settingsStyles.container}>
      {/* Sección de configuración general */}
      <SettingsSection title={t('generalSettings')}>
        {/* Citas motivacionales */}
        <SettingsToggle
          icon="chatbubble-ellipses-outline"
          title="MOTIVATIONAL QUOTES"
          value={quotesEnabled}
          onValueChange={handleToggleQuotes}
        />

        {/* Frecuencia de citas (solo visible si las citas están habilitadas) */}
        {quotesEnabled && (
          <SettingsOption
            icon="time-outline"
            title="QUOTE FREQUENCY"
            value={getQuoteFrequencyText(quotesFrequency)}
            onPress={() => setQuotesModalVisible(true)}
          />
        )}
        
        {/* Selector de idioma */}
        <SettingsOption
          icon="language-outline"
          title={t('language')}
          value={
            currentLanguage === 'es' ? 'Español' : 
            currentLanguage === 'pt' ? 'Português' : 'English'
          }
          onPress={() => setLanguageModalVisible(true)}
        />
        
        {/* Notificaciones */}
        <SettingsToggle
          icon="notifications-outline"
          title={t('notifications')}
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
        />
        
        {/* Hora de recordatorio (solo visible si las notificaciones están habilitadas) */}
        {notificationsEnabled && (
          <SettingsOption
            icon="time-outline"
            title={t('reminderTime')}
            value={reminderTime}
            onPress={() => handleSetReminderTime("20:00")}
          />
        )}
        
        {/* Seguridad */}
        <SettingsToggle
          icon="lock-closed-outline"
          title={t('appSecurity')}
          value={securityEnabled}
          onValueChange={handleToggleSecurity}
        />
      </SettingsSection>
      
      {/* Sección de gestión de datos */}
      <SettingsSection title={t('dataManagement')}>
        {/* Formato de exportación */}
        <SettingsOption
          icon="document-outline"
          title={t('exportFormat')}
          value={exportFormat.toUpperCase()}
          onPress={() => handleSelectExportFormat(exportFormat === 'json' ? 'csv' : 'json')}
        />
        
        {/* Exportar datos */}
        <SettingsOption
          icon="download-outline"
          title={t('exportData')}
          onPress={handleExportData}
        />
        
        {/* Importar datos */}
        <SettingsOption
          icon="cloud-upload-outline"
          title={t('importData')}
          onPress={handleImportData}
        />
      </SettingsSection>
      
      {/* Sección de zona peligrosa */}
      <SettingsSection title={t('dangerZone')}>
        {/* Reiniciar aplicación */}
        <SettingsOption
          icon="trash-outline"
          title={t('resetApp')}
          onPress={handleResetApp}
          isDanger={true}
          rightIcon="warning-outline"
        />
      </SettingsSection>
      
      {/* Sección de información */}
      <SettingsSection title={t('about')}>
        {/* Versión */}
        <SettingsOption
          icon="information-circle-outline"
          title={t('version')}
          value="1.0.0"
          showChevron={false}
          onPress={() => {}}
        />
      </SettingsSection>
      
      {/* Pie de página */}
      <View style={settingsStyles.footer}>
        <Text style={settingsStyles.footerText}>© 2025 RESH</Text>
      </View>

      {/* Modal para selector de idioma */}
      <LanguageModal
        visible={languageModalVisible}
        currentLanguage={currentLanguage}
        onSelectLanguage={onSelectLanguage}
        onClose={() => setLanguageModalVisible(false)}
      />

      {/* Modal para frecuencia de citas */}
      <QuoteFrequencyModal
        visible={quotesModalVisible}
        currentFrequency={quotesFrequency}
        currentLanguage={currentLanguage}
        onSelectFrequency={onSelectQuoteFrequency}
        onClose={() => setQuotesModalVisible(false)}
      />
    </ScrollView>
  );
};

export default SettingsScreen;