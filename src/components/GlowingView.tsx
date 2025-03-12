// src/components/GlowingView.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';

interface GlowingViewProps {
  glowColor: string;
  intensity?: 'low' | 'medium' | 'high';
  style?: ViewStyle;
  children: React.ReactNode;
  isActive?: boolean;
  borderWidth?: number; // Nuevo parámetro para controlar el ancho del borde
}

/**
 * Un componente que envuelve al contenido y produce un efecto de glow con el color especificado
 */
const GlowingView: React.FC<GlowingViewProps> = ({
  glowColor,
  intensity = 'medium',
  style,
  children,
  isActive = true,
  borderWidth: customBorderWidth,
}) => {
  // Determinar los valores de glow según la intensidad
  const getGlowValues = () => {
    // Valores de borde más delgados para cada nivel de intensidad
    const intensityValues = {
      low: { radius: 6, opacity: 0.5, width: 0.5 },
      medium: { radius: 10, opacity: 0.7, width: 0.8 },
      high: { radius: 15, opacity: 0.9, width: 1 },
    };

    const values = intensityValues[intensity];
    
    // Si se proporciona un ancho de borde personalizado, lo usamos
    if (customBorderWidth !== undefined) {
      values.width = customBorderWidth;
    }

    return values;
  };

  const { radius, opacity, width } = getGlowValues();
  
  // Solo aplicar el glow si está activo
  const glowStyles: ViewStyle = isActive ? {
    // Base styles for both platforms
    borderColor: glowColor,
    borderWidth: width,
    
    // Platform specific shadow
    ...Platform.select({
      ios: {
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: opacity,
        shadowRadius: radius,
      },
      // Android specific shadow (less effective for glow)
      android: {
        elevation: 16, // Valor reducido de 24 a 16
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: opacity,
        shadowRadius: radius * 1.5, // Compensar por la menor efectividad en Android
      },
    }) as ViewStyle, // Add type assertion for Platform.select result
  } : {};

  // Crear un "doble borde" para el efecto en Android
  const OuterGlow = () => {
    if (!isActive || Platform.OS !== 'android') return null;
    
    const borderRadiusValue = typeof style?.borderRadius === 'number' 
      ? style.borderRadius + 1 // Reducido de +2 a +1
      : 0;
    
    return (
      <View 
        style={[
          StyleSheet.absoluteFill,
          {
            borderColor: glowColor,
            borderWidth: width * 1.2, // Reducido de 1.5 a 1.2
            borderRadius: borderRadiusValue,
            opacity: opacity * 0.7,
            zIndex: -1,
          } as ViewStyle
        ]} 
      />
    );
  };

  // Combinamos el estilo base con los estilos de glow y los estilos personalizados
  const combinedStyle: ViewStyle = {
    ...styles.container,
    ...style,
    ...glowStyles
  };

  return (
    <View style={{ position: 'relative' }}>
      <OuterGlow />
      <View style={combinedStyle}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default GlowingView;