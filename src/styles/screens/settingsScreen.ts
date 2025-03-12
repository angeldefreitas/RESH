// src/styles/screens/settingsScreen.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
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
  settingValue: {
    fontSize: fontSize.sm,
    color: colors.grey.light,
    marginRight: spacing.xs,
  },
  dangerItem: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(168, 81, 42, 0.1)',
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.grey.medium,
  },
});