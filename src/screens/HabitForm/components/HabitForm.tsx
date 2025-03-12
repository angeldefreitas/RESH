// src/screens/HabitForm/components/HabitForm.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { HabitFormProps } from '../types';
import { FormMode } from '../constants';
import { colors } from '../../../styles/theme';
import { addHabitStyles } from '../../../styles/screens/addHabitScreen';
import ColorSelector from './ColorSelector';
import EmojiSelector from './EmojiSelector';
import FormPreview from './FormPreview';
import { useHabitForm } from '../hooks/useHabitForm';

const HabitForm: React.FC<HabitFormProps> = ({
  initialValues,
  mode,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  
  const {
    values,
    showEmojiSelector,
    setShowEmojiSelector,
    handleNameChange,
    handleDescriptionChange,
    handleColorSelect,
    handleEmojiSelect
  } = useHabitForm({
    initialValues,
    mode,
    onSuccess: undefined, // Se maneja a través de onSubmit
    navigation: { goBack: () => {} } // No usamos navigation directamente aquí
  });

  // Texto del botón según el modo
  const submitButtonText = mode === FormMode.ADD
    ? t('saveHabit')
    : t('updateHabit') || "ACTUALIZAR HÁBITO";

  return (
    <ScrollView style={addHabitStyles.container}>
      <View style={addHabitStyles.formContainer}>
        {/* Campo de nombre del hábito */}
        <View style={addHabitStyles.inputGroup}>
          <Text style={addHabitStyles.label}>{t('habitName')}</Text>
          <View style={addHabitStyles.inputWrapper}>
            <Text style={addHabitStyles.emojiIcon}>{values.emoji}</Text>
            <TextInput
              style={addHabitStyles.input}
              value={values.name}
              onChangeText={handleNameChange}
              placeholder={t('habitNamePlaceholder')}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              maxLength={50}
            />
          </View>
        </View>
        
        {/* Campo de descripción */}
        <View style={addHabitStyles.inputGroup}>
          <Text style={addHabitStyles.label}>{t('habitDescription')}</Text>
          <TextInput
            style={[addHabitStyles.input, addHabitStyles.textArea]}
            value={values.description}
            onChangeText={handleDescriptionChange}
            placeholder={t('habitDescriptionPlaceholder')}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            multiline
            numberOfLines={4}
            maxLength={200}
          />
        </View>
        
        {/* Selector de color/emoji */}
        <View style={addHabitStyles.inputGroup}>
          <View style={addHabitStyles.segmentedControl}>
            <TouchableOpacity 
              style={[
                addHabitStyles.segmentButton, 
                !showEmojiSelector && addHabitStyles.segmentButtonActive,
                { borderColor: values.color }
              ]}
              onPress={() => setShowEmojiSelector(false)}
            >
              <Text style={[
                addHabitStyles.segmentButtonText,
                !showEmojiSelector && { color: values.color }
              ]}>{t('habitColor')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                addHabitStyles.segmentButton, 
                showEmojiSelector && addHabitStyles.segmentButtonActive,
                { borderColor: values.color }
              ]}
              onPress={() => setShowEmojiSelector(true)}
            >
              <Text style={[
                addHabitStyles.segmentButtonText,
                showEmojiSelector && { color: values.color }
              ]}>{t('habitEmoji')}</Text>
            </TouchableOpacity>
          </View>
          
          {/* Selector condicional */}
          {!showEmojiSelector ? (
            <ColorSelector
              selectedColor={values.color}
              onSelectColor={handleColorSelect}
            />
          ) : (
            <EmojiSelector
              selectedEmoji={values.emoji}
              onSelectEmoji={handleEmojiSelect}
              selectedColor={values.color}
            />
          )}
          
          {/* Vista previa */}
          <FormPreview
            name={values.name}
            emoji={values.emoji}
            color={values.color}
            placeholderText={t('habitNamePlaceholder')}
          />
        </View>
        
        {/* Botones de acción */}
        <TouchableOpacity 
          style={[addHabitStyles.button, { backgroundColor: values.color }]}
          onPress={() => onSubmit(values)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={addHabitStyles.buttonText}>{submitButtonText}</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[addHabitStyles.button, addHabitStyles.cancelButton]}
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <Text style={addHabitStyles.cancelButtonText}>{t('cancel')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HabitForm;