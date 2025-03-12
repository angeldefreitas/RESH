// src/screens/HabitForm/components/ColorSelector.tsx
import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOR_PALETTE } from '../constants';
import { ColorSelectorProps } from '../types';
import { addHabitStyles } from '../../../styles/screens/addHabitScreen';

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onSelectColor }) => {
  return (
    <FlatList
      data={COLOR_PALETTE}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={addHabitStyles.colorPaletteContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            addHabitStyles.colorItem,
            { backgroundColor: item },
            selectedColor === item && addHabitStyles.colorItemSelected
          ]}
          onPress={() => onSelectColor(item)}
        />
      )}
    />
  );
};

export default ColorSelector;