// src/screens/AddHabitScreen/AddHabitScreen.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { addHabit } from '../../utils/storage';
import HabitForm from '../HabitForm/components/HabitForm';
import { FormMode, DEFAULT_FORM_VALUES } from '../HabitForm/constants';
import { HabitFormValues, AddHabitScreenProps } from '../HabitForm/types';

const AddHabitScreen: React.FC<AddHabitScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Manejar envío del formulario
  const handleSubmit = async (values: HabitFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Crear nuevo hábito
      const newHabit = {
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
      initialValues={DEFAULT_FORM_VALUES}
      mode={FormMode.ADD}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
    />
  );
};

export default AddHabitScreen;