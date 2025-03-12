// src/screens/HabitForm/components/FormPreview.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FormPreviewProps } from '../types';
import { addHabitStyles } from '../../../styles/screens/addHabitScreen';

const FormPreview: React.FC<FormPreviewProps> = ({
  name,
  emoji,
  color,
  placeholderText
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={addHabitStyles.previewContainer}>
      <Text style={addHabitStyles.previewText}>{t('preview')}:</Text>
      <View style={[
        addHabitStyles.previewItem, 
        { 
          backgroundColor: `${color}20`, 
          borderColor: color 
        }
      ]}>
        <Text style={addHabitStyles.previewEmoji}>{emoji}</Text>
        <Text style={[
          addHabitStyles.previewItemText, 
          { color }
        ]}>
          {name || placeholderText}
        </Text>
      </View>
    </View>
  );
};

export default FormPreview;