// src/styles/theme.ts
// Tema con estilo militar/táctico con mayor contraste y luminosidad

export const colors = {
    // Colores principales - más brillantes
    primary: '#5D6F25',      // Verde militar/oliva más brillante
    secondary: '#6E6C5C',    // Gris verdoso táctico más brillante
    accent: '#A06A3A',       // Marrón táctico más brillante
    background: '#F0EEE0',   // Beige claro táctico más brillante
    white: '#FFFFFF',        // Blanco puro para mayor contraste
    black: '#1A1A18',        // Negro táctico
    
    // Escala de grises - mayor contraste
    grey: {
      light: '#E5E5DC',      // Gris claro táctico más brillante
      medium: '#8A8A7C',     // Gris medio táctico más brillante
      dark: '#5D5D57',       // Gris oscuro táctico más brillante
      darker: '#3F3F3A',     // Gris más oscuro
      darkest: '#25252A',    // Gris casi negro
    },
    
    // Estados - colores más vibrantes
    success: '#517D2C',      // Verde militar (completado) más brillante
    error: '#A8512A',        // Marrón rojizo (error/fallado) más brillante
    warning: '#DAB03A',      // Amarillo militar (advertencia) más brillante
    info: '#5C7DA6',         // Azul militar más brillante
    transparent: 'transparent',
    shadow: {
      color: '#1A1A18',
      opacity: 0.3,         // Mayor opacidad para las sombras
    }
  };
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  
  export const fontSize = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  };
  
  export const fontWeight = {
    normal: 'normal',
    medium: '500',
    bold: 'bold',
  };
  
  export const borderRadius = {
    none: 0,    
    sm: 2,      
    md: 4,      
    lg: 6,      
    xl: 12,     
    circle: 50,
  };
  
  export const elevation = {
    small: {
      elevation: 3,          // Mayor elevación para más contraste
      shadowColor: colors.shadow.color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.shadow.opacity,
      shadowRadius: 2,
    },
    medium: {
      elevation: 6,          // Mayor elevación para más contraste
      shadowColor: colors.shadow.color,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,   // Más opacidad en las sombras
      shadowRadius: 4,
    }
  };