// src/screens/HabitForm/hooks/useHabitForm.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HabitFormValues, UseHabitFormReturn } from '../types';
import { FormMode, MAX_LENGTHS } from '../constants';
import { addHabit, updateHabit, Habit } from '../../../utils/storage';

interface UseHabitFormProps {
  initialValues: HabitFormValues;
  mode: FormMode;
  onSuccess?: () => void;
  navigation: any;
}

export const useHabitForm = ({
  initialValues,
  mode,
  onSuccess,
  navigation
}: UseHabitFormProps): UseHabitFormReturn => {
  const { t } = useTranslation();
  const [values, setValues] = useState<HabitFormValues>(initialValues);
  const [showEmojiSelector, setShowEmojiSelector] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validar el formulario
  const isValid = !!values.name.trim();

  // Manejadores de cambios
  const handleNameChange = useCallback((text: string) => {
    setValues(prev => ({ ...prev, name: text.slice(0, MAX_LENGTHS.name) }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setValues(prev => ({ ...prev, description: text.slice(0, MAX_LENGTHS.description) }));
  }, []);

  const handleColorSelect = useCallback((color: string) => {
    setValues(prev => ({ ...prev, color }));
  }, []);

  const handleEmojiSelect = useCallback((emoji: string) => {
    setValues(prev => ({ ...prev, emoji }));
  }, []);

  // Enviar formulario
  const handleSubmit = useCallback(async () => {
    if (!isValid) {
      Alert.alert(t('error'), t('emptyNameError'));
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (mode === FormMode.ADD) {
        // Crear nuevo hábito
        const newHabit: Habit = {
          id: Date.now().toString(),
          name: values.name.trim(),
          description: values.description.trim(),
          createdAt: new Date().toISOString(),
          completedDays: [],
          color: values.color,
          emoji: values.emoji
        };
        
        const success = await addHabit(newHabit);
        
        if (success) {
          Alert.alert(t('habitAddedSuccess'), '', [
            { text: t('accept'), onPress: () => navigation.goBack() }
          ]);
        } else {
          Alert.alert(t('error'), t('savingError'));
        }
      } else {
        // Actualizar hábito existente
        const updatedHabit: Habit = {
          id: values.id!,
          name: values.name.trim(),
          description: values.description.trim(),
          createdAt: values.createdAt!,
          completedDays: values.completedDays || [],
          color: values.color,
          emoji: values.emoji
        };
        
        const success = await updateHabit(updatedHabit);
        
        if (success) {
          if (onSuccess) {
            onSuccess();
          }
          
          Alert.alert(t('habitUpdatedSuccess') || 'Hábito actualizado correctamente', '', [
            { text: t('accept'), onPress: () => navigation.goBack() }
          ]);
        } else {
          Alert.alert(t('error'), t('savingError'));
        }
      }
    } catch (error) {
      Alert.alert(t('error'), t('genericError'));
    } finally {
      setIsSubmitting(false);
    }
  }, [isValid, mode, values, t, navigation, onSuccess]);

  return {
    values,
    showEmojiSelector,
    setShowEmojiSelector,
    handleNameChange,
    handleDescriptionChange,
    handleColorSelect,
    handleEmojiSelect,
    handleSubmit,
    isValid
  };
};