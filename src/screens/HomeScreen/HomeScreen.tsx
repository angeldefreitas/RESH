// src/screens/HomeScreen/HomeScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useHabits } from './hooks/useHabits';
import HabitsList from './components/HabitsList';
import HomeHeader from './components/HomeHeader';
import { Habit } from '../../utils/storage';
import { colors, spacing, fontSize } from '../../styles/theme';

// Definir tipos para la navegación
type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habit: any, onUpdated?: () => void };
  Settings: undefined;
  ReorderHabits: { habits: Habit[], onSaveOrder: (habits: Habit[]) => Promise<boolean> };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Definir el componente
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();
  
  // Estado para el modo de reordenamiento
  const [reorderMode, setReorderMode] = useState<boolean>(false);
  
  // Hook para gestión de hábitos
  const { 
    habits, 
    loading, 
    savingHabitIds, 
    loadHabits, 
    toggleHabit, 
    deleteHabit,
    saveHabitsOrder
  } = useHabits();

  // Recargar hábitos cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      loadHabits();
      return () => {};
    }, [loadHabits])
  );

  // Navegación
  const navigateToAddHabit = useCallback(() => {
    navigation.navigate('AddHabit');
  }, [navigation]);

  const navigateToSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);
  
  // Alternar el modo de reordenamiento
  const toggleReorderMode = useCallback(() => {
    setReorderMode(prev => !prev);
  }, []);
  
  // Función para mover un hábito hacia arriba o abajo
  const moveHabit = useCallback((index: number, direction: 'up' | 'down') => {
    // No hacer nada si intentamos mover el primer elemento hacia arriba
    // o el último elemento hacia abajo
    if ((index === 0 && direction === 'up') || 
        (index === habits.length - 1 && direction === 'down')) {
      return;
    }
    
    const newHabits = [...habits];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Intercambiar elementos
    [newHabits[index], newHabits[swapIndex]] = [newHabits[swapIndex], newHabits[index]];
    
    // Actualizar orden
    const updatedHabits = newHabits.map((habit, idx) => ({
      ...habit,
      order: idx
    }));
    
    // Guardar el nuevo orden
    saveHabitsOrder(updatedHabits);
  }, [habits, saveHabitsOrder]);

  return (
    <View style={styles.container}>
      <HomeHeader 
        onAddHabit={navigateToAddHabit}
        onOpenSettings={navigateToSettings}
        onReorderHabits={toggleReorderMode}
        reorderMode={reorderMode}
      />
      
      {reorderMode && (
        <View style={styles.reorderBanner}>
          <Text style={styles.reorderText}>{t('reorderMode')}</Text>
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={toggleReorderMode}
          >
            <Text style={styles.doneButtonText}>{t('done')}</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <HabitsList 
        habits={habits}
        savingHabitIds={savingHabitIds}
        onToggleHabit={toggleHabit}
        onDeleteHabit={deleteHabit}
        onHabitsUpdated={loadHabits}
        reorderMode={reorderMode}
        onMoveHabit={moveHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reorderBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.9)', // Fondo oscuro
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reorderText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  doneButtonText: {
    color: colors.black, // Texto oscuro
    fontWeight: 'bold',
    fontSize: fontSize.sm,
  }
});

export default HomeScreen;