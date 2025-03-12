// src/screens/SettingsScreen/components/SettingItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../../../styles/theme';
import { settingsStyles } from '../../../styles/screens/settingsScreen';

interface SettingItemProps {
  icon: string;
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
  isDanger?: boolean;
  disabled?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  children,
  isDanger = false,
  disabled = false
}) => {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      style={[
        settingsStyles.settingItem,
        isDanger && settingsStyles.dangerItem
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={settingsStyles.settingInfo}>
        <Ionicons 
          name={icon as any} 
          size={24} 
          color={isDanger ? colors.error : colors.white} 
        />
        <Text 
          style={[
            settingsStyles.settingTitle,
            isDanger && { color: colors.error }
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={settingsStyles.settingAction}>
        {children}
      </View>
    </Container>
  );
};

export default SettingItem;