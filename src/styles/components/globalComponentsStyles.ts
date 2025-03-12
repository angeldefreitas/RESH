// src/styles/components/globalComponentsStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSize, borderRadius, elevation } from '../theme';

const { width, height } = Dimensions.get('window');

// Estilos para SplashScreen
export const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D00B8', // Color púrpura de fondo
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'visible', // Permite que la imagen se extienda fuera de sus límites
  },
  logo: {
    width: width,      // 100% del ancho de la pantalla
    height: height,    // 100% de la altura de la pantalla
  },
});

// Estilos para LanguageSelector
export const languageSelectorStyles = StyleSheet.create({
  languageButton: {
    position: 'absolute',
    right: 20,
    bottom: 120, // Posicionado encima de los botones de navegación
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grey.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...elevation.small,
    zIndex: 9999, // Asegura que esté por encima de todo
  },
});

// Estilos para ProgressBar
export const progressBarStyles = StyleSheet.create({
  container: {
    width: '100%', 
    height: 12, 
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  }
});

// Estilos compartidos para elementos de UI comunes
export const uiElementsStyles = StyleSheet.create({
  // Botones
  button: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  // Separadores
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: spacing.md,
  },
  
  // Badges
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 100, // Usamos un valor numérico en lugar de borderRadius.pill
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: 'bold',
    color: colors.white,
  },
  
  // Placeholders
  placeholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  
  // Contenedores
  card: {
    backgroundColor: colors.black,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});