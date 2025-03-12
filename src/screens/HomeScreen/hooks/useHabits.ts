// src/screens/HomeScreen/hooks/useHabits.ts
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { Habit } from '../../../utils/storage';
import * as habitService from '../services/habitService';

export const useHabits = () => {
  const { t } = useTranslation();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingHabitIds, setSavingHabitIds] = useState<string[]>([]);

  // Cargar hábitos desde el almacenamiento
  const loadHabits = useCallback(async () => {
    setLoading(true);
    try {
      const habitsData = await habitService.fetchHabits();
      setHabits(habitsData);
    } catch (error) {
      Alert.alert(t('error'), t('loadingError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  // Cargar hábitos al iniciar
  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  // Alternar la finalización de un hábito para hoy
  const toggleHabit = async (id: string) => {
    // No permitir múltiples operaciones sobre el mismo hábito
    if (savingHabitIds.includes(id)) {
      return;
    }

    const today = new Date().toDateString();
    
    // 1. Primero actualizamos el estado local optimistamente
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const completedDays = [...(habit.completedDays || [])];
        const completedIndex = completedDays.indexOf(today);
        
        if (completedIndex >= 0) {
          // Remover si ya está completado
          completedDays.splice(completedIndex, 1);
        } else {
          // Agregar si no está completado
          completedDays.push(today);
        }
        
        return {
          ...habit,
          completedDays
        };
      }
      return habit;
    });
    
    // Actualizar la UI inmediatamente
    setHabits(updatedHabits);
    
    // Marcar hábito como en proceso de guardado
    setSavingHabitIds(prev => [...prev, id]);
    
    // 2. Luego guardar en segundo plano
    try {
      const updatedHabitsFromServer = await habitService.toggleHabitCompletion(id);
      setHabits(updatedHabitsFromServer);
    } catch (error) {
      // Si hay error, revertir la actualización optimista
      await loadHabits();
      Alert.alert(t('error'), t('savingError'));
    } finally {
      // Quitar hábito de la lista de guardado
      setSavingHabitIds(prev => prev.filter(habitId => habitId !== id));
    }
  };

  // Eliminar un hábito
  const deleteHabit = (id: string) => {
    Alert.alert(
      t('deleteHabit'),
      t('deleteConfirmation'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('deleteHabit'), 
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedHabits = await habitService.removeHabit(id);
              setHabits(updatedHabits);
            } catch (error) {
              Alert.alert(t('error'), t('deleteError'));
            }
          }
        }
      ]
    );
  };

  // Guardar el orden actualizado de los hábitos
  const saveHabitsOrder = async (reorderedHabits: Habit[]): Promise<boolean> => {
    try {
      const success = await habitService.updateHabitsOrder(reorderedHabits);
      if (success) {
        setHabits(reorderedHabits);
      }
      return success;
    } catch (error) {
      Alert.alert(t('error'), t('reorderSavingError'));
      // Recargar los hábitos originales en caso de error
      loadHabits();
      return false;
    }
  };

  return {
    habits,
    loading,
    savingHabitIds,
    loadHabits,
    toggleHabit,
    deleteHabit,
    saveHabitsOrder,
  };
};