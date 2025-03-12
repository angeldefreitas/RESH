// src/components/HabitProgressBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';
import { Habit } from '../utils/storage';

interface HabitProgressBarProps {
  habit: Habit;
}

const HabitProgressBar: React.FC<HabitProgressBarProps> = ({ habit }) => {
  const { t } = useTranslation();
  const habitColor = habit.color || colors.primary;

  // Si no hay días completados, no mostrar nada
  if (!habit.completedDays || habit.completedDays.length === 0) {
    return null;
  }

  // Obtener el número de días completados
  const completedDays = habit.completedDays.length;
  
  // Encontrar la fecha del primer día completado (la más antigua)
  const completedDatesObj = habit.completedDays.map(dateStr => new Date(dateStr));
  const oldestCompletedDate = new Date(Math.min(...completedDatesObj.map(date => date.getTime())));
  
  // La fecha actual
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  oldestCompletedDate.setHours(0, 0, 0, 0);
  
  // Calcular el número de días desde el primero hasta hoy
  const diffTime = Math.abs(today.getTime() - oldestCompletedDate.getTime());
  const daysSinceFirst = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día actual
  
  // Calcular días fallados (días desde el primero menos días completados)
  const missedDays = daysSinceFirst - completedDays;
  
  // Calcular la tasa de éxito
  const totalTrackedDays = completedDays + missedDays;
  const successRate = totalTrackedDays > 0 
    ? Math.round((completedDays / totalTrackedDays) * 100)
    : 100; // Si no hay días rastreados, mostramos 100%

  // Colores personalizados
  const crossColor = '#FF073A'; // Rojo neón para la X

  // Componente personalizado para el checkmark
  const CustomCheckmark = () => (
    <View style={[
      styles.customIconContainer,
      {
        backgroundColor: habitColor,
        shadowColor: habitColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      }
    ]}>
      <Text style={styles.customCheckmark}>✓</Text>
    </View>
  );
  
  // Componente personalizado para la X
  const CustomCross = () => (
    <View style={[
      styles.customIconContainer,
      {
        backgroundColor: crossColor,
        shadowColor: crossColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      }
    ]}>
      <Text style={styles.customCross}>✕</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Contenedor principal de estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <CustomCheckmark />
          <Text style={styles.statText}>
            {completedDays}
          </Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <CustomCross />
          <Text style={styles.statText}>
            {missedDays}
          </Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Ionicons 
            name="analytics-outline" 
            size={14} 
            color={habitColor}
            style={{
              textShadowColor: habitColor,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 3,
            }} 
          />
          <Text style={styles.statText}>
            {successRate}%
          </Text>
        </View>
      </View>
      
      {/* Barra de progreso que refleja la tasa de éxito */}
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${successRate}%`,
              backgroundColor: habitColor,
              shadowColor: habitColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 3,
              elevation: 3,
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs, // Reducido para dejar espacio para el streak centralizado
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: fontSize.xs,
    color: colors.grey.light,
    marginLeft: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: spacing.sm,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  customIconContainer: {
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customCheckmark: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
    lineHeight: 14,
    textAlign: 'center',
  },
  customCross: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold',
    lineHeight: 14,
    textAlign: 'center',
  }
});

export default HabitProgressBar;