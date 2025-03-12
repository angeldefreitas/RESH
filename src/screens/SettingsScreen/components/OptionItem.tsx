// src/screens/SettingsScreen/components/OptionItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, borderRadius } from '../../../styles/theme';

interface OptionItemProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  selectedStyles?: any;
  textStyles?: any;
  selectedTextStyles?: any;
}

const OptionItem: React.FC<OptionItemProps> = ({
  label,
  selected,
  onSelect,
  selectedStyles,
  textStyles,
  selectedTextStyles
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.optionItem,
        selected && styles.selectedItem,
        selected && selectedStyles
      ]}
      onPress={onSelect}
    >
      <Text style={[
        styles.optionText,
        textStyles,
        selected && styles.selectedText,
        selected && selectedTextStyles
      ]}>{label}</Text>
      {selected && (
        <Ionicons name="checkmark-circle" size={24} color={colors.white} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionItem: {
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
  selectedItem: {
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
  selectedText: {
    fontWeight: 'bold',
    color: colors.white,
  }
});

export default OptionItem;