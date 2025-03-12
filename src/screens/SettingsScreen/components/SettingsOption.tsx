// src/screens/SettingsScreen/components/SettingsOption.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/theme';
import { settingsOptionStyles } from '../../../styles';
import SettingItem from './SettingItem';

interface SettingsOptionProps {
  icon: string;
  title: string;
  value?: string | null;
  onPress: () => void;
  disabled?: boolean;
  showChevron?: boolean;
  rightIcon?: string;
  isDanger?: boolean;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  value,
  onPress,
  disabled = false,
  showChevron = true,
  rightIcon,
  isDanger = false
}) => {
  return (
    <SettingItem 
      icon={icon} 
      title={title} 
      onPress={onPress} 
      disabled={disabled}
      isDanger={isDanger}
    >
      {value && (
        <Text style={settingsOptionStyles.settingValue}>{value}</Text>
      )}
      {rightIcon ? (
        <Ionicons 
          name={rightIcon as any} 
          size={20} 
          color={isDanger ? colors.error : colors.grey.medium} 
        />
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={20} color={colors.grey.medium} />
      ) : null}
    </SettingItem>
  );
};

export default SettingsOption;