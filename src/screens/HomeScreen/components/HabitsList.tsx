// src/screens/HomeScreen/components/HabitsList.tsx
import React, { useCallback } from 'react';
import { 
  View, 
  ScrollView,
  StyleSheet
} from 'react-native';
import { homeStyles } from '../../../styles';
import { Habit } from '../../../utils/storage';
import EmptyHabitsList from './EmptyHabitsList';
import HabitItem from '../../../components/HabitItem';

interface HabitsListProps {
  habits: Habit[];
  savingHabitIds: string[];
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onHabitsUpdated: () => void;
  reorderMode?: boolean;
  onMoveHabit?: (index: number, direction: 'up' | 'down') => void;
}

const HabitsList: React.FC<HabitsListProps> = ({
  habits,
  savingHabitIds,
  onToggleHabit,
  onDeleteHabit,
  onHabitsUpdated,
  reorderMode = false,
  onMoveHabit
}) => {
  // Manejar toggle
  const handleToggleHabit = useCallback((id: string) => {
    onToggleHabit(id);
  }, [onToggleHabit]);

  // Manejar eliminación
  const handleDeleteHabit = useCallback((id: string) => {
    onDeleteHabit(id);
  }, [onDeleteHabit]);

  // Manejar movimiento arriba
  const handleMoveUp = useCallback((index: number) => {
    if (onMoveHabit) {
      onMoveHabit(index, 'up');
    }
  }, [onMoveHabit]);

  // Manejar movimiento abajo
  const handleMoveDown = useCallback((index: number) => {
    if (onMoveHabit) {
      onMoveHabit(index, 'down');
    }
  }, [onMoveHabit]);

  // Si no hay hábitos, mostrar mensaje vacío
  if (habits.length === 0) {
    return <EmptyHabitsList />;
  }

  return (
    <ScrollView 
      style={homeStyles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={homeStyles.habitList}>
        {habits.map((habit, index) => (
          <HabitItem
            key={`habit-${habit.id}`}
            habit={habit}
            index={index}
            onToggle={() => handleToggleHabit(habit.id)}
            onDelete={() => handleDeleteHabit(habit.id)}
            onUpdated={onHabitsUpdated}
            isLoading={savingHabitIds.includes(habit.id)}
            reorderMode={reorderMode}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            isFirst={index === 0}
            isLast={index === habits.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  }
});

export default HabitsList;