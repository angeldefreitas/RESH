// src/components/HabitPixelGrid.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../utils/storage';
import { colors } from '../styles/theme';

interface HabitPixelGridProps {
  habit: Habit;
  days?: number;
  onPressGrid?: () => void;
}

const HabitPixelGrid: React.FC<HabitPixelGridProps> = ({
  habit,
  days = 150,
  onPressGrid
}) => {
  const habitColor = habit.color || colors.primary;
  
  // Función para determinar si un día específico está completado
  const isDayCompleted = (dayIndex: number): boolean => {
    if (!habit.completedDays || habit.completedDays.length === 0) {
      return false;
    }
    
    // Calcular la fecha para este pixel
    const date = new Date();
    date.setDate(date.getDate() - dayIndex);
    const dateString = date.toDateString();
    
    return habit.completedDays.includes(dateString);
  };
  
  // Generar matriz de píxeles
  const renderPixelGrid = () => {
    // Número de píxeles por fila
    const pixelsPerRow = 25;
    // Calcular número de filas
    const rows = Math.ceil(days / pixelsPerRow);
    
    const grid = [];
    let dayCount = 0;
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      
      for (let j = 0; j < pixelsPerRow && dayCount < days; j++) {
        // Determinar si este pixel es para un día completado
        const isCompleted = isDayCompleted(dayCount);
        
        row.push(
          <View
            key={`pixel-${i}-${j}`}
            style={[
              styles.pixel,
              isCompleted ? {
                backgroundColor: habitColor,
                borderColor: habitColor,
                shadowColor: habitColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
              } : {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }
            ]}
          />
        );
        
        dayCount++;
      }
      
      grid.push(
        <View key={`row-${i}`} style={styles.row}>
          {row}
        </View>
      );
    }
    
    return grid;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: `${habitColor}15` }
      ]}
      onPress={onPressGrid}
      activeOpacity={0.7}
    >
      {renderPixelGrid()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 0, // Modificación: Reducido de 4 a 0 para eliminar el espacio lateral
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
    width: '100%', // Asegura que use todo el ancho disponible
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0.5,
  },
  pixel: {
    width: 12,
    height: 12,
    margin: 0.5,
    borderWidth: 0.25,
    borderRadius: 2,
  },
  emptyPixel: {
    width: 12,
    height: 12,
    margin: 0.5,
  }
});

export default HabitPixelGrid;