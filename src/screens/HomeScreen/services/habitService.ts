// src/screens/HomeScreen/services/habitService.ts
import { Habit, loadHabits, saveHabits, updateHabit, deleteHabit as deleteHabitStorage, toggleHabitCompletion as toggleHabitStorage } from '../../../utils/storage';

// Cargar todos los hábitos
export const fetchHabits = async (): Promise<Habit[]> => {
  try {
    return await loadHabits();
  } catch (error) {
    console.error('Error fetching habits:', error);
    return [];
  }
};

// Marcar un hábito como completado/incompleto para hoy
export const toggleHabitCompletion = async (habitId: string): Promise<Habit[]> => {
  try {
    await toggleHabitStorage(habitId);
    return await loadHabits();
  } catch (error) {
    console.error('Error toggling habit completion:', error);
    throw error;
  }
};

// Eliminar un hábito
export const removeHabit = async (habitId: string): Promise<Habit[]> => {
  try {
    await deleteHabitStorage(habitId);
    return await loadHabits();
  } catch (error) {
    console.error('Error removing habit:', error);
    throw error;
  }
};

// Actualizar el orden de los hábitos
export const updateHabitsOrder = async (reorderedHabits: Habit[]): Promise<boolean> => {
  try {
    // Asignar nuevos valores de orden basados en la posición actual
    const updatedHabits = reorderedHabits.map((habit, index) => ({
      ...habit,
      order: index
    }));
    
    // Guardar directamente el nuevo orden
    return await saveHabits(updatedHabits);
  } catch (error) {
    console.error('Error updating habits order:', error);
    throw error;
  }
};