// src/components/LanguageSelector.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Modal,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { loadLanguage, changeLanguage } from '../utils/i18n';
import { colors, spacing, fontSize, borderRadius, elevation } from '../styles/theme';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    // Cargar el idioma guardado
    const fetchLanguage = async () => {
      const language = await loadLanguage();
      setCurrentLanguage(language);
    };
    
    fetchLanguage();
  }, []);

  const handleChangeLanguage = async (language: string) => {
    await changeLanguage(language);
    setCurrentLanguage(language);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity 
        style={styles.languageButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="language" size={28} color={colors.white} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {currentLanguage === 'es' ? 'SELECCIONAR IDIOMA' : 
                 currentLanguage === 'pt' ? 'SELECIONAR IDIOMA' : 'SELECT LANGUAGE'}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={28} color={colors.grey.medium} />
              </TouchableOpacity>
            </View>
            
            {/* English Option */}
            <TouchableOpacity 
              style={[
                styles.languageOption,
                currentLanguage === 'en' && styles.selectedLanguage
              ]}
              onPress={() => handleChangeLanguage('en')}
            >
              <Text style={[
                styles.languageText,
                currentLanguage === 'en' && styles.selectedLanguageText
              ]}>English</Text>
              {currentLanguage === 'en' && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            {/* Spanish Option */}
            <TouchableOpacity 
              style={[
                styles.languageOption,
                currentLanguage === 'es' && styles.selectedLanguage
              ]}
              onPress={() => handleChangeLanguage('es')}
            >
              <Text style={[
                styles.languageText,
                currentLanguage === 'es' && styles.selectedLanguageText
              ]}>Español</Text>
              {currentLanguage === 'es' && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            {/* Portuguese Option */}
            <TouchableOpacity 
              style={[
                styles.languageOption,
                currentLanguage === 'pt' && styles.selectedLanguage
              ]}
              onPress={() => handleChangeLanguage('pt')}
            >
              <Text style={[
                styles.languageText,
                currentLanguage === 'pt' && styles.selectedLanguageText
              ]}>Português</Text>
              {currentLanguage === 'pt' && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>
                {currentLanguage === 'es' ? 'ACEPTAR' : 
                 currentLanguage === 'pt' ? 'ACEITAR' : 'ACCEPT'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    position: 'absolute',
    right: 20,
    bottom: 120, // Posicionado encima de los botones de navegación
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grey.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...elevation.small,
    zIndex: 9999, // Asegura que esté por encima de todo
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.black,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderWidth: 1,                   
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...elevation.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeButton: {
    padding: spacing.xs,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  languageText: {
    fontSize: fontSize.md,
    color: colors.white,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    color: colors.white,
  },
  doneButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  doneButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default LanguageSelector;