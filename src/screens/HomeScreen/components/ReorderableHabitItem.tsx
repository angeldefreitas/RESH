// src/screens/HomeScreen/components/ReorderableHabitItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Habit } from '../../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../../styles/theme';

interface ReorderableHabitItemProps {
  habit: Habit;
  index: number;
  draggingIndex: Animated.SharedValue<number | null>;
  positions: Animated.SharedValue<number[]>;
  itemHeight: Animated.SharedValue<number>;
  onLayout?: (event: any) => void;
}

// Función de utilidad para mover un elemento en un array
function moveItem<T>(array: T[], from: number, to: number): T[] {
  const newArray = [...array];
  const item = newArray.splice(from, 1)[0];
  newArray.splice(to, 0, item);
  return newArray;
}

const ReorderableHabitItem: React.FC<ReorderableHabitItemProps> = ({
  habit,
  index,
  draggingIndex,
  positions,
  itemHeight,
  onLayout
}) => {
  // Valores animados para posición y estilo
  const position = useSharedValue(0);
  const isDragging = useSharedValue(false);
  
  // Calcular la posición actual basada en el array de posiciones
  const currentPosition = positions.value.indexOf(index);

  // Manejar animaciones cuando cambia el orden
  useAnimatedReaction(
    () => positions.value.indexOf(index),
    (currentPos, prevPos) => {
      if (currentPos !== prevPos && currentPos !== -1) {
        position.value = withTiming(currentPos * itemHeight.value);
      }
    },
    [positions.value]
  );

  // Manejar el gesto de arrastre
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number }>({
    onStart: (_, ctx) => {
      ctx.startY = position.value;
      isDragging.value = true;
      draggingIndex.value = currentPosition;
    },
    onActive: (event, ctx) => {
      // Mover el elemento mientras se arrastra
      position.value = ctx.startY + event.translationY;
      
      // Calcular nueva posición en la lista
      const newPosition = Math.round(position.value / itemHeight.value);
      
      // Asegurarnos de que la nueva posición esté dentro de los límites
      const safeNewPosition = Math.max(0, Math.min(newPosition, positions.value.length - 1));
      
      // Actualizar posiciones si es necesario
      if (safeNewPosition !== draggingIndex.value && draggingIndex.value !== null) {
        // Crear nuevo array de posiciones
        const newPositions = moveItem(
          positions.value,
          draggingIndex.value,
          safeNewPosition
        );
        
        // Actualizar valor compartido
        positions.value = newPositions;
        // Actualizar el índice de arrastre
        draggingIndex.value = safeNewPosition;
      }
    },
    onEnd: () => {
      // Al soltar, animar a la posición "snap" más cercana
      const finalPosition = positions.value.indexOf(index);
      position.value = withSpring(finalPosition * itemHeight.value, {
        damping: 15,
        stiffness: 150,
      });
      
      isDragging.value = false;
      draggingIndex.value = null;
    },
  });

  // Estilo animado para el elemento
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: isDragging.value ? 1 : 0,
      shadowOpacity: withTiming(isDragging.value ? 0.3 : 0),
      shadowOffset: { width: 0, height: isDragging.value ? 10 : 0 },
      transform: [
        { translateY: position.value },
        { scale: withTiming(isDragging.value ? 1.03 : 1) }
      ],
    };
  });

  // Obtener el color y emoji del hábito
  const habitColor = habit.color || colors.primary;
  const habitEmoji = habit.emoji || '✅';

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        onLayout={onLayout}
      >
        <View style={[styles.content, { borderLeftColor: habitColor }]}>
          <View style={styles.habitInfo}>
            <View style={styles.titleRow}>
              <View style={[
                styles.habitEmojiContainer,
                {
                  backgroundColor: `${habitColor}30`,
                  borderColor: habitColor,
                }
              ]}>
                <Text style={styles.habitEmoji}>{habitEmoji}</Text>
              </View>
              
              <Text style={styles.habitName}>{habit.name}</Text>
            </View>
            
            {habit.description ? (
              <Text style={styles.habitDescription}>{habit.description}</Text>
            ) : null}
          </View>
          
          <View style={styles.dragIconContainer}>
            <Ionicons name="menu" size={24} color={colors.grey.medium} />
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    height: 80, // Altura fija para facilitar animaciones
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
  },
  habitInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitName: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: spacing.sm,
  },
  habitDescription: {
    fontSize: fontSize.sm,
    color: colors.grey.light,
    marginTop: spacing.xs,
    marginLeft: 42, // Alineado con el nombre del hábito
  },
  dragIconContainer: {
    padding: spacing.xs,
  },
  habitEmojiContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  habitEmoji: {
    fontSize: 20,
  },
});

export default ReorderableHabitItem;