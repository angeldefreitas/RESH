// src/styles/modals/settingsModalsStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius, elevation } from '../theme';

// Estilos base compartidos por todos los modales de configuración
export const baseSettingsModalStyles = StyleSheet.create({
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
  doneButton: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  doneButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

// Estilos específicos para el modal de idioma
export const languageModalStyles = StyleSheet.create({
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
    borderLeftColor: colors.white,
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
});

// Estilos específicos para el modal de frecuencia de citas
export const quoteFrequencyModalStyles = StyleSheet.create({
  frequencyOption: {
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
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: colors.white,
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.white,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: colors.white,
  },
});