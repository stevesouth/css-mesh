// CSS Mesh Library - Main Entry Point
// Production build excludes demo components for minimal bundle size

// Main component exports
export { default as MeshGradient } from './components/MeshGradient';

// Type exports
export type {
  EllipseConfig,
  BackgroundConfig,
  ThemePack,
  ThemeCollection,
} from './types/theme.types';

export type {
  AnimationType,
  AnimationConfig,
  AnimationDefinition,
  AnimationKeyframe,
  AnimationStyles,
} from './types/animation.types';

export type {
  MeshGradientProps,
} from './types/component.types';

// Theme exports
export {
  ALL_THEMES,
  BASE_THEMES,
  DRAMATIC_THEMES,
  THEME_NAMES,
  DARK_THEMES,
  LIGHT_THEMES,
  getTheme,
  isLightTheme,
} from './themes';

// Animation exports
export {
  ANIMATIONS,
  CONTAINER_ANIMATIONS,
  KEYFRAME_GENERATORS,
  FLOAT_ANIMATION,
  PULSE_ANIMATION,
  WAVE_ANIMATION,
  ROTATION_ANIMATION,
  ORBIT_ANIMATION,
  getAnimation,
  generateAnimationKeyframes,
  getAnimationStyles,
  generateContainerAnimationKeyframes,
  getContainerAnimationStyles,
} from './animations';

// Version
export const VERSION = '0.7.1'; 