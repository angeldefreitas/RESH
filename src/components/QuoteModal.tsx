// src/components/QuoteModal.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { getRandomQuote, Quote } from '../utils/quotes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/theme';
import { quoteModalStyles } from '../styles';

interface QuoteModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ visible, onClose }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    if (visible) {
      // Get a new random quote when modal opens
      setQuote(getRandomQuote());
      
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        })
      ]).start();

      // Provide haptic feedback when quote appears
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [visible]);

  // Handle close with animation
  const handleClose = async () => {
    // Save current timestamp to ensure quote doesn't appear too frequently
    try {
      await AsyncStorage.setItem('RESH_LAST_QUOTE_TIME', Date.now().toString());
    } catch (error) {
      console.error('Error saving quote time:', error);
    }
    
    // Animate and close
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose();
    });
  };

  if (!quote) return null;

  // Choose a random neon color for the quote
  const neonColors = [
    '#FF0A54', // Rojo neón
    '#FF00FF', // Fucsia neón 
    '#B806FD', // Morado neón
    '#4CC9F0', // Azul cian neón
    '#00FF7F', // Verde primavera neón
    '#39FF14', // Verde neón
    '#FFFF00', // Amarillo neón
    '#FF9500', // Naranja neón
  ];
  
  const quoteColor = neonColors[Math.floor(Math.random() * neonColors.length)];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleClose}
    >
      <BlurView intensity={40} style={quoteModalStyles.blurContainer}>
        <TouchableOpacity 
          style={quoteModalStyles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        >
          <Animated.View 
            style={[
              quoteModalStyles.quoteContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                borderColor: quoteColor,
                shadowColor: quoteColor,
              }
            ]}
          >
            <View style={quoteModalStyles.quoteHeader}>
              <Ionicons name="barbell-outline" size={24} color={quoteColor} />
              <Text style={[quoteModalStyles.headerText, { color: quoteColor }]}>DAILY MOTIVATION</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
            
            <View style={quoteModalStyles.quoteContent}>
              <Text style={quoteModalStyles.quoteText}>"{quote.text}"</Text>
              <Text style={[quoteModalStyles.authorText, { color: quoteColor }]}>— {quote.author}</Text>
            </View>
            
            <TouchableOpacity 
              style={[quoteModalStyles.closeButton, { backgroundColor: quoteColor }]}
              onPress={handleClose}
            >
              <Text style={quoteModalStyles.closeButtonText}>GET AFTER IT!</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

export default QuoteModal;