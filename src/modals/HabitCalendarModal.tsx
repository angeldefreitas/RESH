import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Habit, updateHabit } from '../utils/storage';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';
import { useTranslation } from 'react-i18next';

interface HabitCalendarModalProps {
  visible: boolean;
  habit: Habit;
  onClose: () => void;
  onUpdated?: () => void;
}

const HabitCalendarModal: React.FC<HabitCalendarModalProps> = ({ 
  visible, 
  habit, 
  onClose,
  onUpdated
}) => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);
  const [pendingChanges, setPendingChanges] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const habitColor = habit.color || colors.primary;
  const habitEmoji = habit.emoji || '✅';

  // Inicializar los cambios pendientes con los días completados del hábito al abrir el modal
  useEffect(() => {
    if (visible && habit.completedDays) {
      setPendingChanges([...habit.completedDays]);
    }
  }, [visible, habit]);

  // Actualizar el calendario cuando cambia el mes
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  // Generar los días del calendario
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    const days: Array<Date | null> = [];
    
    // Añadir días vacíos al principio para alinear con el día de la semana
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Añadir los días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    setCalendarDays(days);
  };

  // Función para cambiar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Función para cambiar al mes siguiente
  const goToNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    
    // No permitir navegar a meses futuros más allá del mes actual
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  // Formatear nombre del mes y año
  const getMonthYearText = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return currentMonth.toLocaleDateString('es-ES', options);
  };

  // Verificar si un día está completado en los cambios pendientes
  const isDayCompleted = (date: Date) => {
    const dateString = date.toDateString();
    return pendingChanges.includes(dateString);
  };

  // Verificar si un día es hoy
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Verificar si un día es futuro (no permitir marcar días futuros)
  const isFutureDay = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  // Alternar el estado de completado de un día en los cambios pendientes
  // Ahora solo actualiza el estado local, sin guardar inmediatamente
  const toggleDay = (date: Date) => {
    if (isFutureDay(date)) return; // No permitir marcar días futuros

    const dateString = date.toDateString();
    const newPendingChanges = [...pendingChanges];
    const index = newPendingChanges.indexOf(dateString);
    
    if (index !== -1) {
      // Remover fecha si ya existe
      newPendingChanges.splice(index, 1);
    } else {
      // Agregar fecha si no existe
      newPendingChanges.push(dateString);
    }
    
    setPendingChanges(newPendingChanges);
  };

  // Guardar todos los cambios pendientes
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const updatedHabit = { ...habit, completedDays: pendingChanges };
      await updateHabit(updatedHabit);
      
      // Notificar que se ha actualizado el hábito
      if (onUpdated) {
        onUpdated();
      }
      
      // Cerrar el modal después de guardar
      onClose();
    } catch (error) {
      console.error('Error al actualizar el hábito:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Cancelar cambios y cerrar el modal
  const handleCancel = () => {
    setPendingChanges(habit.completedDays || []);
    onClose();
  };

  // Agrupar los días en filas para mejor presentación
  const renderCalendarRows = () => {
    const rows = [];
    let week = [];
    
    for (let i = 0; i < calendarDays.length; i++) {
      week.push(calendarDays[i]);
      
      if ((i + 1) % 7 === 0 || i === calendarDays.length - 1) {
        // Si estamos en la última semana y no está completa, añadir celdas vacías
        while (week.length < 7) {
          week.push(null);
        }
        
        rows.push(week);
        week = [];
      }
    }
    
    return rows.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.calendarRow}>
        {row.map((day, dayIndex) => (
          <TouchableOpacity 
            key={`day-${rowIndex}-${dayIndex}`}
            style={[
              styles.calendarDay,
              !day && styles.emptyDay,
              day && isDayCompleted(day) && [
                styles.completedDay, 
                { 
                  backgroundColor: habitColor,
                  shadowColor: habitColor,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                }
              ],
              day && isToday(day) && styles.todayBorder,
              day && isFutureDay(day) && styles.futureDay
            ]}
            onPress={() => day && toggleDay(day)}
            disabled={!day || isFutureDay(day)}
          >
            {day && (
              <Text style={[
                styles.calendarDayText,
                isDayCompleted(day) && styles.completedDayText,
                isToday(day) && { fontWeight: 'bold' }
              ]}>
                {day.getDate()}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };
  
  // Calcular si hay cambios pendientes comparando con el estado original
  const hasChanges = () => {
    if (!habit.completedDays && pendingChanges.length > 0) return true;
    if (!habit.completedDays) return false;
    
    if (habit.completedDays.length !== pendingChanges.length) return true;
    
    // Comparar si las fechas son las mismas
    const sortedOriginal = [...habit.completedDays].sort();
    const sortedPending = [...pendingChanges].sort();
    
    for (let i = 0; i < sortedOriginal.length; i++) {
      if (sortedOriginal[i] !== sortedPending[i]) return true;
    }
    
    return false;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Cabecera con nombre del hábito */}
          <View style={styles.habitHeader}>
            <View style={[
              styles.habitEmojiContainer, 
              { 
                backgroundColor: habitColor,
                shadowColor: habitColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
              }
            ]}>
              <Text style={styles.habitEmoji}>{habitEmoji}</Text>
            </View>
            <Text style={styles.habitTitle}>{habit.name}</Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Navegación del mes */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={goToPreviousMonth}>
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{getMonthYearText()}</Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <Ionicons name="chevron-forward" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Días de la semana */}
          <View style={styles.weekDaysRow}>
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
              <Text key={index} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          <ScrollView style={styles.calendarContainer}>
            {/* Cuadrícula del calendario */}
            <View style={styles.calendarGrid}>
              {renderCalendarRows()}
            </View>
          </ScrollView>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.cancelButton, { borderColor: colors.grey.medium }]}
              onPress={handleCancel}
              disabled={isSaving}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                { 
                  backgroundColor: habitColor,
                  opacity: hasChanges() ? 1 : 0.5 
                }
              ]}
              onPress={saveChanges}
              disabled={isSaving || !hasChanges()}
            >
              {isSaving ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.saveButtonText}>{t('accept')}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Instrucción */}
          <Text style={styles.instruction}>
            {t('calendarInstructions') || "Toca cualquier día del calendario para marcar o desmarcar tu hábito"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default HabitCalendarModal;