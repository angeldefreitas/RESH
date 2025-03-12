// src/screens/SettingsScreen/modals/LanguageModal.tsx
import React from 'react';
import { colors } from '../../../styles/theme';
import { LANGUAGE_OPTIONS } from '../constants';
import SettingsModal from '../components/SettingsModal';
import OptionItem from '../components/OptionItem';

interface LanguageModalProps {
  visible: boolean;
  currentLanguage: string;
  onSelectLanguage: (language: string) => void;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  currentLanguage,
  onSelectLanguage,
  onClose
}) => {
  // Texto del botón Aceptar según el idioma
  const getAcceptText = () => {
    switch (currentLanguage) {
      case 'es': return 'ACEPTAR';
      case 'pt': return 'ACEITAR';
      default: return 'ACCEPT';
    }
  };

  // Texto del encabezado según el idioma
  const getTitleText = () => {
    switch (currentLanguage) {
      case 'es': return 'SELECCIONAR IDIOMA';
      case 'pt': return 'SELECIONAR IDIOMA';
      default: return 'SELECT LANGUAGE';
    }
  };

  return (
    <SettingsModal
      visible={visible}
      title={getTitleText()}
      onClose={onClose}
      acceptText={getAcceptText()}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <OptionItem
          key={option.code}
          label={option.label}
          selected={currentLanguage === option.code}
          onSelect={() => onSelectLanguage(option.code)}
          selectedStyles={{ borderLeftColor: colors.white }}
        />
      ))}
    </SettingsModal>
  );
};

export default LanguageModal;