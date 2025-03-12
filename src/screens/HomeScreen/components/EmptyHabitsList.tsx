// src/components/home/EmptyHabitsList.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../styles';
import { homeStyles } from '../../../styles';

const EmptyHabitsList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <View style={homeStyles.emptyContainer}>
      <Ionicons name="clipboard-outline" size={60} color={colors.white} />
      <Text style={homeStyles.emptyMessage}>{t('noActiveHabits')}</Text>
      <Text style={homeStyles.emptySubMessage}>{t('addFirstHabit')}</Text>
    </View>
  );
};

export default EmptyHabitsList;