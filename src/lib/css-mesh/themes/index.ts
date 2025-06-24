import { BASE_THEMES } from './base-themes';
import { DRAMATIC_THEMES } from './dramatic-themes';
import type { ThemeCollection } from '../types/theme.types';

// Organized theme collection: 10 Dark themes first, then 10 Light themes
export const ALL_THEMES: ThemeCollection = {
  // === DARK THEMES (10) ===
  sunset: BASE_THEMES.sunset,
  ocean: BASE_THEMES.ocean,
  aurora: BASE_THEMES.aurora,
  cosmic: BASE_THEMES.cosmic,
  forest: BASE_THEMES.forest,
  monochrome: BASE_THEMES.monochrome,
  volcanic: DRAMATIC_THEMES.volcanic,
  electric: DRAMATIC_THEMES.electric,
  neon: DRAMATIC_THEMES.neon,
  shapes: {
    backgroundColor: '#1a1a2e',
    shapes: [
      {
        id: 'shape-ellipse',
        width: 70,
        height: 45,
        x: 10,
        y: 15,
        gradient: 'radial-gradient(ellipse, #ff6b6b 0%, #ee5a24 50%, #ff9ff3 100%)',
        blur: 20,
        opacity: 0.7,
        zIndex: 1,
        shape: 'ellipse',
      },
      {
        id: 'shape-circle',
        width: 60,
        height: 60,
        x: 70,
        y: 10,
        gradient: 'radial-gradient(circle, #74b9ff 0%, #0984e3 50%, #00cec9 100%)',
        blur: 18,
        opacity: 0.6,
        zIndex: 2,
        shape: 'ellipse', // Circle is just ellipse with equal width/height
      },
      {
        id: 'shape-rectangle',
        width: 80,
        height: 30,
        x: -10,
        y: 65,
        gradient: 'linear-gradient(45deg, #a55eea 0%, #26de81 50%, #fd79a8 100%)',
        blur: 16,
        opacity: 0.8,
        zIndex: 3,
        shape: 'rectangle',
      },
      {
        id: 'shape-rounded',
        width: 85,
        height: 35,
        x: 40,
        y: 45,
        gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 50%, #ff6b6b 100%)',
        blur: 17,
        opacity: 0.6,
        zIndex: 4,
        shape: 'rectangle', // Rounded rectangle is just rectangle with borderRadius
        shapeProps: { borderRadius: '20px' },
      },
    ],
  },

  // === LIGHT THEMES (10) ===
  minimal: BASE_THEMES.minimal,
  dreamy: DRAMATIC_THEMES.dreamy,
  spring: BASE_THEMES.spring,
  sky: BASE_THEMES.sky,
  cream: BASE_THEMES.cream,
  dawn: BASE_THEMES.dawn,
  pearl: BASE_THEMES.pearl,
  blush: BASE_THEMES.blush,
  lavender: {
    backgroundColor: '#f8f4ff',
    shapes: [
      {
        id: 'lavender-1',
        width: 85,
        height: 30,
        x: -10,
        y: 25,
        gradient: 'radial-gradient(ellipse, rgba(221, 160, 221, 0.6) 0%, rgba(230, 230, 250, 0.4) 50%, rgba(248, 248, 255, 0.2) 100%)',
        blur: 18,
        opacity: 0.8,
        zIndex: 1,
      },
      {
        id: 'lavender-2',
        width: 75,
        height: 25,
        x: 50,
        y: 15,
        gradient: 'radial-gradient(ellipse, rgba(186, 85, 211, 0.5) 0%, rgba(221, 160, 221, 0.3) 50%, rgba(230, 230, 250, 0.2) 100%)',
        blur: 16,
        opacity: 0.7,
        zIndex: 2,
      },
      {
        id: 'lavender-3',
        width: 80,
        height: 28,
        x: 20,
        y: 60,
        gradient: 'radial-gradient(ellipse, rgba(230, 230, 250, 0.7) 0%, rgba(221, 160, 221, 0.5) 30%, rgba(248, 248, 255, 0.3) 100%)',
        blur: 19,
        opacity: 0.6,
        zIndex: 3,
      },
    ],
  },
  mint: {
    backgroundColor: '#f0fff4',
    shapes: [
      {
        id: 'mint-1',
        width: 85,
        height: 30,
        x: -15,
        y: 20,
        gradient: 'radial-gradient(ellipse, rgba(144, 238, 144, 0.6) 0%, rgba(152, 251, 152, 0.4) 50%, rgba(240, 255, 240, 0.2) 100%)',
        blur: 18,
        opacity: 0.8,
        zIndex: 1,
      },
      {
        id: 'mint-2',
        width: 75,
        height: 25,
        x: 50,
        y: 10,
        gradient: 'radial-gradient(ellipse, rgba(102, 205, 170, 0.7) 0%, rgba(144, 238, 144, 0.5) 40%, rgba(240, 255, 244, 0.3) 100%)',
        blur: 16,
        opacity: 0.7,
        zIndex: 2,
      },
      {
        id: 'mint-3',
        width: 80,
        height: 28,
        x: 25,
        y: 65,
        gradient: 'radial-gradient(ellipse, rgba(175, 238, 238, 0.8) 0%, rgba(152, 251, 152, 0.6) 30%, rgba(240, 255, 240, 0.4) 100%)',
        blur: 19,
        opacity: 0.6,
        zIndex: 3,
      },
    ],
  },
};

// Export individual collections for backward compatibility
export { BASE_THEMES, DRAMATIC_THEMES };

// Export theme names in the new order (dark first, then light)
export const THEME_NAMES = Object.keys(ALL_THEMES) as string[];

// Dark themes (first 10)
export const DARK_THEMES = THEME_NAMES.slice(0, 10);

// Light themes (last 10)  
export const LIGHT_THEMES = THEME_NAMES.slice(10, 20);

// Helper function to get a theme by name
export const getTheme = (themeName: string) => {
  return ALL_THEMES[themeName] || ALL_THEMES.sunset;
};

// Helper function to check if theme is light
export const isLightTheme = (themeName: string): boolean => {
  return LIGHT_THEMES.includes(themeName);
}; 