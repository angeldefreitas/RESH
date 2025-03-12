// src/utils/habitStatsUtils.ts
import { Habit } from './storage';

interface HabitProgress {
  totalDays: number;
  completedDays: number;
  failedDays: number;
  completionRate: number;
}

/**
 * Calcula el progreso general de un hábito desde su creación
 * @param habit El hábito para calcular el progreso
 * @returns Objeto con estadísticas de progreso
 */
export const calculateHabitProgress = (habit: Habit): HabitProgress => {
  // Si no hay fecha de creación o no hay días completados, retorna valores por defecto
  if (!habit.createdAt || !habit.completedDays) {
    return {
      totalDays: 0,
      completedDays: 0,
      failedDays: 0,
      completionRate: 0
    };
  }

  // Convertir fecha de creación a Date
  const creationDate = new Date(habit.createdAt);
  const today = new Date();
  
  // Asegurarse de que las fechas estén normalizadas (sin horas, minutos, etc.)
  creationDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Calcular la diferencia en días entre la fecha de creación y hoy
  const diffTime = Math.abs(today.getTime() - creationDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día actual
  
  // Contar días completados (solo hasta hoy, no días futuros)
  const completedDays = habit.completedDays.filter(day => {
    const dayDate = new Date(day);
    return dayDate <= today;
  }).length;
  
  // Calcular días fallados
  const failedDays = totalDays - completedDays;
  
  // Asegurarnos de que los contadores sean correctos
  // El número de días completados no puede ser mayor al total de días
  const validCompletedDays = Math.min(completedDays, totalDays);
  // Recalcular días fallados
  const validFailedDays = totalDays - validCompletedDays;
  
  // Calcular tasa de completado (asegurarse de que nunca exceda el 100%)
  const completionRate = totalDays > 0 ? Math.min(100, Math.round((validCompletedDays / totalDays) * 100)) : 0;
  
  return {
    totalDays,
    completedDays: validCompletedDays,
    failedDays: validFailedDays,
    completionRate
  };
};