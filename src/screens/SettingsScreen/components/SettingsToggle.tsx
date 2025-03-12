// src/screens/SettingsScreen/components/SettingsToggle.tsx
import React from 'react';
import { Switch } from 'react-native';
import { colors } from '../../../styles/theme';
import SettingItem from './SettingItem';

interface SettingsToggleProps {
  icon: string;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  icon,
  title,
  value,
  onValueChange,
  disabled = false
}) => {
  return (
    <SettingItem icon={icon} title={title} disabled={disabled}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.grey.dark, true: colors.primary }}
        thumbColor={value ? colors.white : colors.grey.light}
        disabled={disabled}
      />
    </SettingItem>
  );
};

export default SettingsToggle;