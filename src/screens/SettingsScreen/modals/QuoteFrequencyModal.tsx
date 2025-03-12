// src/screens/SettingsScreen/modals/QuoteFrequencyModal.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../styles/theme';
import { QUOTE_FREQUENCIES } from '../constants';
import SettingsModal from '../components/SettingsModal';
import OptionItem from '../components/OptionItem';

interface QuoteFrequencyModalProps {
  visible: boolean;
  currentFrequency: number;
  currentLanguage: string;
  onSelectFrequency: (frequency: number) => void;
  onClose: () => void;
}

const QuoteFrequencyModal: React.FC<QuoteFrequencyModalProps> = ({
  visible,
  currentFrequency,
  currentLanguage,
  onSelectFrequency,
  onClose
}) => {
  const { t } = useTranslation();

  // Texto del botón Aceptar según el idioma
  const getAcceptText = () => {
    switch (currentLanguage) {
      case 'es': return 'ACEPTAR';
      case 'pt': return 'ACEITAR';
      default: return 'ACCEPT';
    }
  };

  return (
    <SettingsModal
      visible={visible}
      title="QUOTE FREQUENCY"
      onClose={onClose}
      acceptText={getAcceptText()}
    >
      {QUOTE_FREQUENCIES.map((option) => (
        <OptionItem
          key={option.value}
          label={option.label}
          selected={currentFrequency === option.value}
          onSelect={() => onSelectFrequency(option.value)}
          selectedStyles={{ borderLeftColor: colors.white }}
        />
      ))}
    </SettingsModal>
  );
};

export default QuoteFrequencyModal;