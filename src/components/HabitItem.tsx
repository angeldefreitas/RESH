// src/components/HabitItem.tsx - Error de tipado corregido
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Habit } from '../utils/storage';
import { habitItemStyles } from '../styles';
import { colors } from '../styles/theme';
import HabitPixelGrid from './HabitPixelGrid';
import HabitProgressBar from './habitProgressBar';
import HabitCalendarModal from '../modals/HabitCalendarModal';
import EmojiBurst from './EmojiBurst';
import GlowingView from './GlowingView';
import * as Haptics from 'expo-haptics';

// Definir tipos para la navegación
type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habit: Habit, onUpdated?: () => void };
  Settings: undefined;
};

type HabitItemNavigationProp = StackNavigationProp<RootStackParamList>;

interface HabitItemProps {
  habit: Habit;
  index: number;
  onToggle: () => void;
  onDelete: () => void;
  onUpdated?: () => void;
  isLoading?: boolean;
  reorderMode?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const HabitItem: React.FC<HabitItemProps> = ({ 
  habit, 
  index,
  onToggle, 
  onDelete, 
  onUpdated,
  isLoading = false,
  reorderMode = false,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<HabitItemNavigationProp>();
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [showEmojiBurst, setShowEmojiBurst] = useState<boolean>(false);
  const today = new Date().toDateString();
  const isCompletedToday = habit.completedDays && habit.completedDays.includes(today);

  // Calcular racha
  const calculateStreak = useCallback((): number => {
    if (!habit.completedDays || habit.completedDays.length === 0) {
      return 0;
    }

    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < 100; i++) {
      const dateString = currentDate.toDateString();
      if (habit.completedDays.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }, [habit.completedDays]);

  const streak = calculateStreak();
  const habitColor = habit.color || colors.primary;
  const habitEmoji = habit.emoji || '✅';
  
  // Manejar apertura del calendario
  const handleOpenCalendar = useCallback(() => {
    setCalendarVisible(true);
  }, []);

  // Manejar cierre del calendario
  const handleCloseCalendar = useCallback(() => {
    setCalendarVisible(false);
  }, []);

  // Manejar actualización del hábito
  const handleHabitUpdated = useCallback(() => {
    if (onUpdated) {
      onUpdated();
    }
  }, [onUpdated]);

  // Manejar navegación a edición de hábito
  const handleEditHabit = useCallback(() => {
    navigation.navigate('EditHabit', { 
      habit: habit,
      onUpdated: handleHabitUpdated
    });
  }, [navigation, habit, handleHabitUpdated]);

  // Manejar el final de la animación
  const handleAnimationComplete = useCallback(() => {
    setShowEmojiBurst(false);
  }, []);

  // Manejar el toggle y mostrar animación
  const handleToggleHabit = useCallback(async () => {
    // No permitir toggle si está cargando o en modo reordenamiento
    if (isLoading || reorderMode) return;
    
    // Solo mostrar animación si estamos marcando como completado
    if (!isCompletedToday) {
      try {
        // Feedback táctil
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (error) {
        console.log('Haptics not supported');
      }
      
      // IMPORTANTE: Mostrar la animación ANTES de llamar al toggle
      setShowEmojiBurst(true);
      
      // Dar un pequeño retraso para que la animación pueda iniciarse
      // antes de que potencialmente se actualice la UI
      setTimeout(() => {
        onToggle();
      }, 50);
    } else {
      // Si ya está completado, solo hacemos toggle sin animación
      onToggle();
    }
  }, [isLoading, isCompletedToday, onToggle, reorderMode]);

  // Creamos un único objeto de estilo combinado para el GlowingView
  // en lugar de un array de estilos para evitar el error de tipado
  const containerStyle: ViewStyle = {
    ...habitItemStyles.container,
    borderLeftColor: habitColor,
    marginBottom: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
  };
  
  return (
    <GlowingView 
      glowColor={habitColor}
      intensity={isCompletedToday ? "high" : "medium"}
      isActive={true}
      style={containerStyle}
    >
      {/* Encabezado del hábito */}
      <View style={habitItemStyles.header}>
        <TouchableOpacity 
          style={habitItemStyles.titleContainer}
          onPress={handleEditHabit}
          activeOpacity={0.7}
          disabled={isLoading || reorderMode}
        >
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
            <Text style={[
              habitItemStyles.title,
              { 
                textShadowColor: habitColor,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: isCompletedToday ? 4 : 0
              }
            ]}>{habit.name}</Text>
          </View>
          {habit.description ? (
            <Text style={habitItemStyles.description}>{habit.description}</Text>
          ) : null}
        </TouchableOpacity>
        
        {reorderMode ? (
          // Botones de reordenamiento
          <View style={styles.reorderButtons}>
            <TouchableOpacity 
              style={[
                styles.arrowButton, 
                isFirst && styles.disabledArrowButton
              ]}
              onPress={onMoveUp}
              disabled={isFirst}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="chevron-up" 
                size={22} 
                color={isFirst ? colors.grey.dark : colors.white} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.arrowButton,
                isLast && styles.disabledArrowButton
              ]}
              onPress={onMoveDown}
              disabled={isLast}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="chevron-down" 
                size={22} 
                color={isLast ? colors.grey.dark : colors.white}
              />
            </TouchableOpacity>
          </View>
        ) : (
          // Mostrar botones normales si no estamos en modo de reordenamiento
          <View style={habitItemStyles.actionsContainer}>
            {isLoading ? (
              <ActivityIndicator 
                size="small" 
                color={habitColor} 
                style={habitItemStyles.checkbox}
              />
            ) : (
              <View style={styles.checkboxContainer}>
                {/* Animación de emojis */}
                <EmojiBurst
                  emoji={habitEmoji}
                  visible={showEmojiBurst}
                  count={12}
                  onAnimationComplete={handleAnimationComplete}
                />
                
                <TouchableOpacity 
                  style={habitItemStyles.checkbox}
                  onPress={handleToggleHabit}
                  disabled={isLoading}
                >
                  {isCompletedToday ? (
                    <View style={[
                      styles.customCheckbox,
                      {
                        backgroundColor: habitColor,
                        shadowColor: habitColor,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 5,
                        borderColor: habitColor,
                      }
                    ]}>
                      <Text style={styles.checkEmoji}>✓</Text>
                    </View>
                  ) : (
                    <Ionicons name="square-outline" size={28} color={colors.grey.medium} />
                  )}
                </TouchableOpacity>
              </View>
            )}
            
            <TouchableOpacity 
              style={habitItemStyles.deleteButton}
              onPress={onDelete}
              disabled={isLoading}
            >
              <Ionicons 
                name="trash-outline" 
                size={24} 
                color={isLoading ? colors.grey.medium : colors.error} 
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Visualización principal */}
      <View style={[
        habitItemStyles.content,
        { paddingHorizontal: 6 } // Reducir el espacio lateral
      ]}>
        <HabitPixelGrid 
          habit={habit} 
          days={150} 
          onPressGrid={handleOpenCalendar}
        />
        
        {/* Nuevo componente de progreso */}
        <HabitProgressBar habit={habit} />
        
        <View style={[
          habitItemStyles.streakContainer,
          { alignSelf: 'center' }, // Cambio aquí: centrar la racha
          streak > 0 ? {
            backgroundColor: `${habitColor}40`,
            borderColor: habitColor,
            borderWidth: 1
          } : {}
        ]}>
          <Ionicons 
            name="flame" 
            size={16} 
            color={streak > 0 ? habitColor : "#ccc"} 
            style={streak > 0 ? {
              textShadowColor: habitColor,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 5,
            } : {}}
          />
          <Text style={[
            habitItemStyles.streak, 
            streak > 0 && habitItemStyles.activeStreak,
            streak > 0 && { 
              color: habitColor,
              textShadowColor: habitColor,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 2,
            }
          ]}>
            {streak} {streak === 1 ? t('day') : t('days')}
          </Text>
        </View>
      </View>

      {/* Modal del calendario */}
      <HabitCalendarModal 
        visible={calendarVisible}
        habit={habit}
        onClose={handleCloseCalendar}
        onUpdated={handleHabitUpdated}
      />
    </GlowingView>
  );
};

const styles = StyleSheet.create({
  customCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 5,
  },
  checkEmoji: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitEmojiContainer: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  habitEmoji: {
    fontSize: 20,
  },
  checkboxContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  reorderButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    marginRight: 5,
  },
  arrowButton: {
    width: 30,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginVertical: 2,
  },
  disabledArrowButton: {
    opacity: 0.3,
  }
});

export default React.memo(HabitItem);