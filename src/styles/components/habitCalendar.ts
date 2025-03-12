// src/styles/components/habitCalendar.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSize, borderRadius, elevation } from '../theme';

// Obtener el ancho de la pantalla para calcular el tamaño de las celdas del calendario
const { width } = Dimensions.get('window');

// AJUSTE IMPORTANTE: Asegurarnos de que todas las celdas tengan exactamente el mismo ancho
// Dividimos el ancho disponible entre 7 (para los 7 días de la semana)
const CELL_SIZE = Math.floor((width - (spacing.md * 2)) / 7); // 7 días con espaciado en los bordes

export const habitCalendarStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,  
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,                 
    borderColor: colors.grey.light,
    ...elevation.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,           
    borderBottomColor: colors.grey.light,
  },
  monthYearText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.grey.darkest,
    letterSpacing: 0.5,                
    textTransform: 'uppercase',        
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
    backgroundColor: colors.grey.light, 
    paddingVertical: spacing.xs,
    // Ajuste: Asegurar que el ancho coincide exactamente con el grid de días
    width: CELL_SIZE * 7,
    alignSelf: 'center',
  },
  weekDayText: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: fontSize.xs,              
    letterSpacing: 0.5,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // Ajuste: Centrar el grid para alinearlo con los días de la semana
    width: CELL_SIZE * 7,
    alignSelf: 'center',
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    // Removido cualquier margen que pudiera afectar la alineación
  },
  dayText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  emptyDay: {
    backgroundColor: colors.transparent,
  },
  completedDay: {
    backgroundColor: 'rgba(81, 125, 44, 0.6)',
    borderColor: colors.success,
  },
  partialDay: {
    backgroundColor: 'rgba(218, 176, 58, 0.6)',
    borderColor: colors.warning,
  },
  missedDay: {
    backgroundColor: 'rgba(168, 81, 42, 0.4)',
    borderColor: colors.error,
  },
  futureDay: {
    backgroundColor: colors.transparent,
    opacity: 0.3,
  },
  todayCell: {
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: 'rgba(93, 111, 37, 0.2)',
  },
  todayText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.grey.light,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.sm,     
    marginRight: spacing.xs,
    borderWidth: 1,                   
    borderColor: colors.grey.medium,
  },
  legendText: {
    fontSize: fontSize.xs,
    color: colors.grey.darkest,
    textTransform: 'uppercase',        
    letterSpacing: 0.5,                
  },
  // Estilos para el modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 24, 0.7)', 
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,    
    padding: spacing.lg,
    borderWidth: 2,                   
    borderColor: colors.primary,
    ...elevation.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey.light,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
    textTransform: 'uppercase',      
    letterSpacing: 0.5,              
  },
  closeButton: {
    padding: spacing.xs,
  },
  modalSubtitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.secondary,
    textTransform: 'uppercase',     
    letterSpacing: 0.5,            
  },
  emptyHabitsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderWidth: 1,                 
    borderColor: colors.grey.light,
    borderRadius: borderRadius.sm,   
    borderStyle: 'dashed',          
  },
  emptyHabitsText: {
    fontSize: fontSize.md,
    color: colors.grey.dark,
    marginTop: spacing.sm,
    textTransform: 'uppercase',      
    letterSpacing: 0.5,             
  },
  habitItem: {
    flexDirection: 'row',
    backgroundColor: colors.grey.light,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.sm,   
    alignItems: 'center',
    borderLeftWidth: 3,            
    borderLeftColor: colors.secondary,
  },
  habitCheckbox: {
    marginRight: spacing.md,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    letterSpacing: 0.3,           
    color: colors.grey.darkest,
  },
  habitDescription: {
    fontSize: fontSize.sm,
    color: colors.grey.dark,
    marginTop: spacing.xs,
  },
  doneButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.sm,    
    alignItems: 'center',
    marginTop: spacing.md,
  },
  doneButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
    letterSpacing: 1,               
  },
  savingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  savingText: {
    marginLeft: spacing.xs,
    color: colors.grey.dark,
    textTransform: 'uppercase',     
    letterSpacing: 0.5,              
  },
});