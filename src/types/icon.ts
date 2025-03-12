// src/types/icon.ts
import { Ionicons } from '@expo/vector-icons';

// Extraer el tipo de nombre de icono de Ionicons
export type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

// Lista de iconos disponibles para hábitos
export const AVAILABLE_ICONS: IoniconsName[] = [
  'fitness-outline', 'barbell-outline', 'bicycle-outline', 'walk-outline', 'book-outline', 
  'library-outline', 'school-outline', 'water-outline', 'cafe-outline', 'fast-food-outline', 
  'beer-outline', 'wine-outline', 'medkit-outline', 'bed-outline', 'moon-outline', 
  'sunny-outline', 'rainy-outline', 'cloud-outline', 'code-outline', 'laptop-outline', 
  'desktop-outline', 'phone-portrait-outline', 'tablet-portrait-outline', 'musical-notes-outline', 
  'headset-outline', 'mic-outline', 'globe-outline', 'language-outline', 'home-outline', 
  'business-outline', 'briefcase-outline', 'cash-outline', 'card-outline', 'wallet-outline',
  'gift-outline', 'heart-outline', 'happy-outline', 'sad-outline', 'trophy-outline', 
  'medal-outline', 'brush-outline', 'color-palette-outline', 'pencil-outline', 'camera-outline', 
  'image-outline', 'people-outline', 'person-outline', 'people-circle-outline', 
  'flame-outline', 'earth-outline', 'leaf-outline', 'flower-outline', 'paw-outline', 
  'airplane-outline', 'train-outline', 'car-outline', 'bus-outline', 'boat-outline', 
  'umbrella-outline', 'checkmark-circle-outline'
];