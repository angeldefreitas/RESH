// src/screens/SettingsScreen/components/SettingsModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/theme';
import { baseSettingsModalStyles } from '../../../styles';

interface SettingsModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  acceptText?: string;
  onAccept?: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  title,
  onClose,
  children,
  acceptText = 'ACCEPT',
  onAccept
}) => {
  // Si no se proporciona onAccept, usamos onClose por defecto
  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={baseSettingsModalStyles.modalContainer}>
        <View style={baseSettingsModalStyles.modalContent}>
          <View style={baseSettingsModalStyles.modalHeader}>
            <Text style={baseSettingsModalStyles.modalTitle}>{title}</Text>
            <TouchableOpacity 
              style={baseSettingsModalStyles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={28} color={colors.grey.medium} />
            </TouchableOpacity>
          </View>
          
          {/* Contenido del modal (proporcionado como children) */}
          {children}
          
          <TouchableOpacity 
            style={baseSettingsModalStyles.doneButton}
            onPress={handleAccept}
          >
            <Text style={baseSettingsModalStyles.doneButtonText}>{acceptText}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SettingsModal;