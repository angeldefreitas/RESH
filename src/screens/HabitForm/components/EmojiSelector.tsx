// src/screens/HabitForm/components/EmojiSelector.tsx
import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { EMOJIS_PER_PAGE } from '../constants';
import { EmojiSelectorProps } from '../types';
import { addHabitStyles } from '../../../styles/screens/addHabitScreen';
import { AVAILABLE_EMOJIS } from '../../../types/emoji';

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  selectedEmoji, 
  onSelectEmoji,
  selectedColor
}) => {
  // Función para organizar emojis en forma de páginas para el scroll horizontal
  const organizeEmojisIntoGrid = useCallback(() => {
    const screenWidth = Dimensions.get('window').width - 32; // Ancho de pantalla menos padding
    const emojiWidth = 48 + 8; // Ancho del emoji + margen
    const emojisPerRow = Math.floor(screenWidth / emojiWidth);
    const emojisPerPage = emojisPerRow * 3; // 3 filas por página
    
    // Crear grupos de emojis para cada página
    const pages: string[][] = [];
    for (let i = 0; i < AVAILABLE_EMOJIS.length; i += emojisPerPage) {
      pages.push(AVAILABLE_EMOJIS.slice(i, i + emojisPerPage));
    }
    
    return pages;
  }, []);

  // Renderizar una página de emojis (como una cuadrícula)
  const renderEmojiPage = useCallback(({ item: pageEmojis }: { item: string[] }) => {
    const screenWidth = Dimensions.get('window').width - 32;
    const emojiWidth = 48 + 8;
    const emojisPerRow = Math.floor(screenWidth / emojiWidth);
    
    return (
      <View style={{ width: screenWidth, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pageEmojis.map((emoji: string, index: number) => (
          <TouchableOpacity
            key={`emoji-${index}`}
            style={[
              addHabitStyles.emojiItem,
              selectedEmoji === emoji && {
                backgroundColor: `${selectedColor}40`,
                borderColor: selectedColor,
              }
            ]}
            onPress={() => onSelectEmoji(emoji)}
          >
            <Text style={addHabitStyles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [selectedEmoji, selectedColor, onSelectEmoji]);

  return (
    <FlatList
      data={organizeEmojisIntoGrid()}
      keyExtractor={(_, index) => `emoji-page-${index}`}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      snapToAlignment="start"
      decelerationRate="fast"
      style={addHabitStyles.emojiGridContainer}
      renderItem={renderEmojiPage}
    />
  );
};

export default EmojiSelector;