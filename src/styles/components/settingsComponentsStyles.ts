// src/styles/components/settingsComponentsStyles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

// Estilos para SettingItem
export const settingItemStyles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: fontSize.md,
    color: colors.white,
    marginLeft: spacing.md,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerItem: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(168, 81, 42, 0.1)',
    borderRadius: 4,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  }
});

// Estilos para SettingsOption
export const settingsOptionStyles = StyleSheet.create({
  settingValue: {
    fontSize: fontSize.sm,
    color: colors.grey.light,
    marginRight: spacing.xs,
  },
});

// Estilos para SettingsToggle
export const settingsToggleStyles = StyleSheet.create({
  // Este componente no necesita estilos específicos ya que utiliza 
  // los estilos de SettingItem y componentes nativos como Switch
});

// Estilos compartidos que podrían ser reutilizados entre componentes de configuración
export const sharedSettingsStyles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 100, // Reemplazado borderRadius.pill por un valor numérico
    marginLeft: spacing.sm,
  },
  badgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: 'bold',
  },
});