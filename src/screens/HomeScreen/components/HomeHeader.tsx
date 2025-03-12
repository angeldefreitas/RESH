// src/screens/HomeScreen/components/HomeHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles';
import { homeStyles } from '../../../styles';

interface HomeHeaderProps {
  onAddHabit: () => void;
  onOpenSettings: () => void;
  onReorderHabits: () => void;
  reorderMode?: boolean;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  onAddHabit,
  onOpenSettings,
  onReorderHabits,
  reorderMode = false
}) => {
  return (
    <View style={homeStyles.header}>
      <Text style={homeStyles.headerTitle}>RESH</Text>
      <View style={homeStyles.headerActions}>
        <TouchableOpacity 
          style={[
            homeStyles.headerButton, 
            reorderMode && styles.activeHeaderButton
          ]} 
          onPress={onReorderHabits}
        >
          <Ionicons 
            name="menu" 
            size={22} 
            color={reorderMode ? colors.black : colors.white} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={homeStyles.headerButton} 
          onPress={onOpenSettings}
        >
          <Ionicons name="settings-outline" size={22} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={homeStyles.headerButton} 
          onPress={onAddHabit}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activeHeaderButton: {
    backgroundColor: colors.white,
  }
});

export default HomeHeader;