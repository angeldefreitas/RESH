// src/styles/modals/habitCalendarModal.ts
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export const habitCalendarModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  habitEmojiContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    elevation: 5,
  },
  habitEmoji: {
    fontSize: 20,
  },
  habitTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.white,
  },
  closeButton: {
    padding: spacing.xs,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  monthTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
    textTransform: 'capitalize',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xs,
  },
  weekDayText: {
    fontSize: fontSize.sm,
    color: colors.grey.medium,
    textAlign: 'center',
    width: 40,
  },
  calendarContainer: {
    maxHeight: 300,
    marginBottom: spacing.md,
  },
  calendarGrid: {
    marginTop: spacing.xs,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: fontSize.md,
    color: colors.white,
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  completedDay: {
    borderWidth: 0,
    elevation: 5,
  },
  completedDayText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  todayBorder: {
    borderWidth: 2,
    borderColor: colors.white,
  },
  futureDay: {
    opacity: 0.3,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    textTransform: 'uppercase',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    textTransform: 'uppercase',
  },
  instruction: {
    textAlign: 'center',
    color: colors.grey.light,
    fontSize: fontSize.xs,
    marginTop: spacing.md,
  }
});