// src/styles/index.ts
// Punto central para exportar todos los estilos

// Tema principal
export * from './theme';

// Estilos de las pantallas
export * from './screens/homeScreen';
export * from './screens/addHabitScreen';
export * from './screens/settingsScreen';

// Estilos de los componentes agrupados
export * from './components/habitComponentsStyles';
export * from './components/settingsComponentsStyles';
export * from './components/globalComponentsStyles';
export * from './components/effectsStyles';

// Estilos de los modales
export * from './modals/habitCalendarModal';
export * from './modals/settingsModalsStyles';

// Exportamos también los estilos individuales anteriores para mantener compatibilidad
// Esto facilita la migración gradual
export { 
  habitItemStyles, 
  habitPixelGridStyles, 
  reorderableHabitStyles 
} from './components/habitComponentsStyles';

export { 
  settingItemStyles, 
  settingsOptionStyles, 
  settingsToggleStyles 
} from './components/settingsComponentsStyles';

export { 
  splashScreenStyles, 
  languageSelectorStyles, 
  progressBarStyles 
} from './components/globalComponentsStyles';

export { 
  emojiBurstStyles, 
  quoteModalStyles,
  animationConstants,
  visualEffectsStyles
} from './components/effectsStyles';

export {
  baseSettingsModalStyles,
  languageModalStyles,
  quoteFrequencyModalStyles
} from './modals/settingsModalsStyles';