// Main component exports
export { default as MeshGradient } from './components/MeshGradient';
export { default as MeshGradientDemo } from './components/demo/MeshGradientDemo';

// Legacy exports for backward compatibility (can be removed in future versions)
export { default as ConfigurableBackground } from './components/MeshGradient';
export { default as BackgroundDemo } from './components/demo/MeshGradientDemo';

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
  MeshGradientDemoProps,
  AnimationControlProps,
  ThemeSelectorProps,
  // Legacy type aliases
  ConfigurableBackgroundProps,
  BackgroundDemoProps,
} from './types/component.types';

// Theme exports
export {
  ALL_THEMES,
  BASE_THEMES,
  DRAMATIC_THEMES,
  THEME_NAMES,
  LIGHT_THEMES,
  getTheme,
  isLightTheme,
} from './themes';

// Animation exports
export {
  ANIMATIONS,
  FLOAT_ANIMATION,
  PULSE_ANIMATION,
  getAnimation,
  generateAnimationKeyframes,
  getAnimationStyles,
} from './animations';

// Version
export const VERSION = '0.1.0'; 