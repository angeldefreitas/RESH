// src/styles/components/habitComponentsStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius, elevation } from '../theme';

// Estilos para HabitItem
export const habitItemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
    borderLeftWidth: 3,
    overflow: 'hidden',
    ...elevation.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.white, // Cambiado de colors.text.primary a colors.white
    marginLeft: spacing.sm,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.grey.light, // Cambiado de colors.text.secondary a colors.grey.light
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginHorizontal: spacing.xs,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  content: {
    padding: spacing.sm,
    paddingTop: 0,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  streak: {
    fontSize: fontSize.xs,
    color: colors.grey.medium, // Cambiado de colors.text.secondary a colors.grey.medium
    marginLeft: spacing.xs,
  },
  activeStreak: {
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  emoji: {
    fontSize: 20,
  },
  customCheckbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  checkboxContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  checkEmoji: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  }
});

// Estilos para HabitPixelGrid
export const habitPixelGridStyles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0.5,
  },
  pixel: {
    margin: 0.5,
    borderWidth: 0.25,
  },
  emptyPixel: {
    margin: 0.5,
  }
});

// Estilos para ReorderableHabit
export const reorderableHabitStyles = StyleSheet.create({
  customCheckbox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    elevation: 5,
  },
  checkEmoji: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitEmojiContainer: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  habitEmoji: {
    fontSize: 20,
  },
  checkboxContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  reorderModeContainer: {
    position: 'relative',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
  },
  draggedContainer: {
    opacity: 0.95,
    borderStyle: 'solid',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
    zIndex: 999,
  }
});

// Estilos comunes para componentes relacionados con hábitos
export const sharedHabitStyles = StyleSheet.create({
  // Estilos para distintas visualizaciones de estado
  completed: {
    opacity: 1,
  },
  incompleted: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  
  // Indicadores visuales
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.black,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  // Container para la lista de hábitos
  listContainer: {
    flex: 1,
    padding: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    color: colors.white,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});