// src/screens/HabitForm/types.ts
import { FormMode } from './constants';
import { Habit } from '../../utils/storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Tipo para los valores del formulario
export interface HabitFormValues {
  id?: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
  createdAt?: string;
  completedDays?: string[];
}

// Props para el componente de formulario principal
export interface HabitFormProps {
  initialValues: HabitFormValues;
  mode: FormMode;
  onSubmit: (values: HabitFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Props para el selector de colores
export interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

// Props para el selector de emojis
export interface EmojiSelectorProps {
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
  selectedColor: string;
}

// Props para la vista previa del hábito
export interface FormPreviewProps {
  name: string;
  emoji: string;
  color: string;
  placeholderText: string;
}

// Props para el encabezado del formulario
export interface FormHeaderProps {
  mode: FormMode;
}

// Hook para gestionar el formulario
export interface UseHabitFormReturn {
  values: HabitFormValues;
  showEmojiSelector: boolean;
  setShowEmojiSelector: (show: boolean) => void;
  handleNameChange: (text: string) => void;
  handleDescriptionChange: (text: string) => void;
  handleColorSelect: (color: string) => void;
  handleEmojiSelect: (emoji: string) => void;
  handleSubmit: () => Promise<void>;
  isValid: boolean;
}

// Tipos para navegación
export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habit: Habit, onUpdated?: () => void };
  Stats: undefined;
  Settings: undefined;
};

// Props específicas para AddHabitScreen y EditHabitScreen
export type AddHabitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddHabit'>;

export interface AddHabitScreenProps {
  navigation: AddHabitScreenNavigationProp;
}

export type EditHabitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditHabit'>;
export type EditHabitScreenRouteProp = RouteProp<RootStackParamList, 'EditHabit'>;

export interface EditHabitScreenProps {
  navigation: EditHabitScreenNavigationProp;
  route: EditHabitScreenRouteProp;
}