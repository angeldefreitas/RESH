// src/screens/SettingsScreen/components/SettingsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../../../styles/theme';
import { settingsStyles } from '../../../styles/screens/settingsScreen';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <View style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default SettingsSection;