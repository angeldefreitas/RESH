// src/screens/HomeScreen/components/ReorderHabitsScreen.tsx
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Habit } from '../../../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../../../styles/theme';

// Define el tipo para props
type ReorderHabitsScreenProps = {
  route: {
    params: {
      habits: Habit[];
      onSaveOrder: (habits: Habit[]) => Promise<boolean>;
    }
  };
};

const ReorderHabitsScreen = ({ route }: ReorderHabitsScreenProps) => {
  const { habits: initialHabits, onSaveOrder } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  // Estado para controlar los hábitos y el loading state
  const [habits, setHabits] = useState<Habit[]>([...initialHabits].sort((a, b) => 
    (a.order !== undefined && b.order !== undefined) ? a.order - b.order : 0
  ));
  const [saving, setSaving] = useState<boolean>(false);
  
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
    
    setHabits(newHabits);
  }, [habits]);
  
  // Función para guardar el nuevo orden
  const saveNewOrder = useCallback(async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      const success = await onSaveOrder(habits);
      
      if (success) {
        navigation.goBack();
      } else {
        Alert.alert(
          t('error'),
          t('reorderSavingError'),
          [{ text: t('accept') }]
        );
      }
    } catch (error) {
      Alert.alert(
        t('error'),
        t('reorderSavingError'),
        [{ text: t('accept') }]
      );
    } finally {
      setSaving(false);
    }
  }, [habits, navigation, onSaveOrder, saving, t]);

  // Renderizar cada ítem de hábito
  const renderItem = useCallback(({ item, index }: { item: Habit, index: number }) => {
    return (
      <View style={styles.habitItemContainer}>
        <View style={[
          styles.habitItem, 
          { borderLeftColor: item.color || colors.primary }
        ]}>
          <View style={styles.habitInfo}>
            <View style={styles.titleRow}>
              <View style={[
                styles.habitEmojiContainer,
                {
                  backgroundColor: `${item.color || colors.primary}30`,
                  borderColor: item.color || colors.primary,
                }
              ]}>
                <Text style={styles.habitEmoji}>{item.emoji || '✅'}</Text>
              </View>
              <Text style={styles.habitName}>{item.name}</Text>
            </View>
            
            {item.description ? (
              <Text style={styles.habitDescription}>{item.description}</Text>
            ) : null}
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.arrowButton, 
                index === 0 && styles.disabledButton
              ]}
              onPress={() => moveHabit(index, 'up')}
              disabled={index === 0}
            >
              <Ionicons name="chevron-up" size={24} color={index === 0 ? colors.grey.medium : colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.arrowButton, 
                index === habits.length - 1 && styles.disabledButton
              ]}
              onPress={() => moveHabit(index, 'down')}
              disabled={index === habits.length - 1}
            >
              <Ionicons name="chevron-down" size={24} color={index === habits.length - 1 ? colors.grey.medium : colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [habits.length, moveHabit]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={saving}
        >
          <Ionicons name="chevron-back" size={24} color={colors.white} />
          <Text style={styles.backButtonText}>{t('cancel')}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{t('dragToReorder')}</Text>
        
        <TouchableOpacity 
          style={[styles.doneButton, saving && styles.disabledButton]}
          onPress={saveNewOrder}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.doneButtonText}>{t('done')}</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    height: 60,
  },
  headerTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    letterSpacing: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  backButtonText: {
    color: colors.white,
    marginLeft: spacing.xs,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  doneButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.sm,
    textTransform: 'uppercase',
  },
  disabledButton: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.md,
  },
  habitItemContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  habitItem: {
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
  },
  arrowButton: {
    width: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 2,
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

export default ReorderHabitsScreen;