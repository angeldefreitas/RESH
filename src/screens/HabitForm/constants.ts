// src/screens/HabitForm/constants.ts

// Paleta de colores neón para selección
export const COLOR_PALETTE = [
    '#FF0A54', // Rojo neón
    '#FF5C8A', // Rosa neón
    '#FF00FF', // Fucsia neón 
    '#B806FD', // Morado neón
    '#7209B7', // Púrpura neón
    '#3A0CA3', // Azul índigo neón
    '#4CC9F0', // Azul cian neón
    '#00FFFF', // Cian neón
    '#00FF7F', // Verde primavera neón
    '#39FF14', // Verde neón
    '#CCFF00', // Verde lima neón
    '#FFFF00', // Amarillo neón
    '#FFD300', // Oro neón
    '#FF9500', // Naranja neón
    '#FF2D00', // Naranja rojizo neón
    '#FE53BB'  // Rosa intenso neón
  ];
  
  // Lista de emojis disponibles (importada desde types/emoji.ts, pero definida aquí para referencia)
  // Esta sería reemplazada por la importación real: import { AVAILABLE_EMOJIS } from '../../types/emoji';
  export const DEFAULT_EMOJI = '✅';
  
  // Modos del formulario
  export enum FormMode {
    ADD = 'add',
    EDIT = 'edit'
  }
  
  // Valores por defecto del formulario
  export const DEFAULT_FORM_VALUES = {
    name: '',
    description: '',
    color: COLOR_PALETTE[0],
    emoji: DEFAULT_EMOJI
  };
  
  // Número de emojis por página
  export const EMOJIS_PER_PAGE = 20;
  
  // Longitudes máximas
  export const MAX_LENGTHS = {
    name: 50,
    description: 200
  };