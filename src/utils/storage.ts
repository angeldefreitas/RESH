import AsyncStorage from '@react-native-async-storage/async-storage';
import { IoniconsName } from '../types/icon';
// Define el tipo para un hábito
export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  completedDays: string[]; // Array de fechas en formato string (Date.toDateString())
  color: string; // Color personalizado para el hábito (formato hexadecimal)
  emoji: string; // Emoji para representar el hábito
  order?: number; // Nuevo campo para el orden personalizado
}

// Clave para almacenar en AsyncStorage
const HABITS_STORAGE_KEY = 'resh_habits';

// Guardar hábitos
export const saveHabits = async (habits: Habit[]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    return true;
  } catch (error) {
    console.error('Error al guardar hábitos:', error);
    return false;
  }
};

// Cargar hábitos
export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const data = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    const habits = data ? JSON.parse(data) : [];
    
    // Asegurarse de que todos los hábitos tengan un valor de orden
    const habitsWithOrder = habits.map((habit: Habit, index: number) => ({
      ...habit,
      order: habit.order !== undefined ? habit.order : index
    }));
    
    // Ordenar por el campo 'order'
    return habitsWithOrder.sort((a: Habit, b: Habit) => 
      (a.order !== undefined && b.order !== undefined) ? a.order - b.order : 0
    );
  } catch (error) {
    console.error('Error al cargar hábitos:', error);
    return [];
  }
};

// Añadir un nuevo hábito
export const addHabit = async (habit: Habit): Promise<boolean> => {
  try {
    const existingHabits = await loadHabits();
    
    // Asignar el orden más alto al nuevo hábito
    const newHabit = {
      ...habit,
      order: existingHabits.length
    };
    
    const updatedHabits = [...existingHabits, newHabit];
    return await saveHabits(updatedHabits);
  } catch (error) {
    console.error('Error al añadir hábito:', error);
    return false;
  }
};

// Actualizar un hábito existente
export const updateHabit = async (updatedHabit: Habit): Promise<boolean> => {
  try {
    const habits = await loadHabits();
    const updatedHabits = habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    return await saveHabits(updatedHabits);
  } catch (error) {
    console.error('Error al actualizar hábito:', error);
    return false;
  }
};

// Eliminar un hábito
export const deleteHabit = async (habitId: string): Promise<boolean> => {
  try {
    const habits = await loadHabits();
    const filteredHabits = habits.filter(habit => habit.id !== habitId);
    
    // Recalcular órdenes para mantener consistencia
    const reorderedHabits = filteredHabits.map((habit, index) => ({
      ...habit,
      order: index
    }));
    
    return await saveHabits(reorderedHabits);
  } catch (error) {
    console.error('Error al eliminar hábito:', error);
    return false;
  }
};

// Alternar la finalización de un hábito para hoy
export const toggleHabitCompletion = async (habitId: string): Promise<boolean> => {
  try {
    const habits = await loadHabits();
    const today = new Date().toDateString();
    
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const completedDays = habit.completedDays || [];
        
        // Si ya está completado hoy, lo desmarcamos
        if (completedDays.includes(today)) {
          return {
            ...habit,
            completedDays: completedDays.filter(day => day !== today)
          };
        } 
        // Si no está completado, lo marcamos
        else {
          return {
            ...habit,
            completedDays: [...completedDays, today]
          };
        }
      }
      return habit;
    });

    return await saveHabits(updatedHabits);
  } catch (error) {
    console.error('Error al alternar hábito:', error);
    return false;
  }
};

// Reordenar hábitos (nueva función)
export const reorderHabits = async (reorderedHabits: Habit[]): Promise<boolean> => {
  try {
    // Asignar nuevos valores de orden basados en la posición actual
    const updatedHabits = reorderedHabits.map((habit, index) => ({
      ...habit,
      order: index
    }));
    
    return await saveHabits(updatedHabits);
  } catch (error) {
    console.error('Error al reordenar hábitos:', error);
    return false;
  }
};

// Limpiar todos los datos
export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(HABITS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar datos:', error);
    return false;
  }
};