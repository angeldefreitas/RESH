// src/styles/components/effectsStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

// Estilos para EmojiBurst
export const emojiBurstStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 10,
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  emoji: {
    textAlign: 'center',
  },
});

// Estilos para QuoteModal
export const quoteModalStyles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  quoteContainer: {
    width: width - 60,
    backgroundColor: 'rgba(15, 15, 15, 0.95)',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quoteContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    width: '100%',
  },
  quoteText: {
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * 1.4,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  authorText: {
    fontSize: fontSize.md,
    fontWeight: '500',
    marginTop: spacing.sm,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  closeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 30,
    marginTop: spacing.md,
  },
  closeButtonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    letterSpacing: 1,
  },
});

// Constantes para animaciones - no podemos usar StyleSheet.create() para esto
export const animationConstants = {
  fadeIn: {
    opacity: {
      start: 0,
      end: 1,
    }
  },
  slideUp: {
    translateY: {
      start: 50,
      end: 0,
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    duration: 1000,
  },
  shake: {
    translateX: [0, -5, 5, -5, 0],
    duration: 500,
  },
  rotate: {
    rotate: {
      start: '0deg',
      end: '360deg',
    }
  },
};

// Estilos para efectos visuales comunes
export const visualEffectsStyles = StyleSheet.create({
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  glassEffect: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: borderRadius.md,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});