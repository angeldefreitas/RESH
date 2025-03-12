// src/screens/EditHabitScreen/EditHabitScreen.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { updateHabit } from '../../utils/storage';
import HabitForm from '../HabitForm/components/HabitForm';
import { FormMode } from '../HabitForm/constants';
import { HabitFormValues, EditHabitScreenProps } from '../HabitForm/types';

const EditHabitScreen: React.FC<EditHabitScreenProps> = ({ navigation, route }) => {
  const { habit, onUpdated } = route.params;
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Preparar valores iniciales del formulario
  const initialValues: HabitFormValues = {
    id: habit.id,
    name: habit.name || '',
    description: habit.description || '',
    color: habit.color || '#5D6F25',
    emoji: habit.emoji || '✅',
    createdAt: habit.createdAt,
    completedDays: habit.completedDays
  };

  // Manejar envío del formulario
  const handleSubmit = async (values: HabitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Actualizar el hábito existente
      const updatedHabit = {
        ...habit,
        name: values.name.trim(),
        description: values.description.trim(),
        color: values.color,
        emoji: values.emoji
      };
      
      const success = await updateHabit(updatedHabit);
      
      if (success) {
        // Notificar que se ha actualizado el hábito
        if (onUpdated) {
          onUpdated();
        }
        
        Alert.alert(t('habitUpdatedSuccess') || 'Hábito actualizado correctamente', '', [
          { text: t('accept'), onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert(t('error'), t('savingError'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar cancelación
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <HabitForm
      initialValues={initialValues}
      mode={FormMode.EDIT}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
    />
  );
};

export default EditHabitScreen;