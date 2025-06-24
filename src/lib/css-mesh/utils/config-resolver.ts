import type { MeshGradientProps } from '../types/component.types';
import type { ThemePack, BackgroundConfig } from '../types/theme.types';
import type { ContainerAnimationType, AnimationType } from '../types/animation.types';

// Centralized defaults - single source of truth
const DEFAULTS = {
  theme: 'sunset',
  className: '',
  style: {},
  animated: false,
  animationType: 'float' as AnimationType,
  animationConfig: {
    duration: 10,
    intensity: 1,
    easing: 'ease-in-out'
  },
  containerAnimation: 'none' as ContainerAnimationType,
  containerAnimationConfig: {
    duration: 10,
    easing: 'linear'
  },
  mouseTracking: {
    enabled: false,
    mode: 'attract' as const,
    intensity: 0.3,
    radius: 30
  },
  visualEffects: {
    saturation: 1.0,
    contrast: 1.0,
    brightness: 1.0,
    hue: 0
  },
  performance: 'auto' as const,
  shape: 'background' as const,
  size: 80,
  dropShadow: false,
  dropShadowOpacity: 0.4,
  dropShadowDirection: { x: 0, y: 8 },
  lighting3d: {
    enabled: false,
    position: { x: 30, y: 30 },
    intensity: 0.3
  },
  finalConfig: {
    backgroundColor: '#1a1a2e',
    shapes: [],
    containerStyle: {}
  }
};

// Complete resolved config with all required properties guaranteed
interface ResolvedConfig {
  // Core props
  theme?: string;
  className: string;
  style: React.CSSProperties;
  children?: React.ReactNode;
  customConfig?: Partial<BackgroundConfig>;
  onThemeChange?: (themeName: string) => void;
  
  // Animation props - all required
  animated: boolean;
  animationType: AnimationType;
  animationConfig: {
    duration: number;
    intensity: number;
    easing: string;
    type?: AnimationType;
    delay?: number;
  };
  containerAnimation: ContainerAnimationType;
  containerAnimationConfig: {
    duration: number;
    easing: string;
  };
  
  // Interaction props - all required
  mouseTracking: {
    enabled: boolean;
    mode: 'attract' | 'repel';
    intensity: number;
    radius: number;
  };
  
  // Visual props - all required
  visualEffects: {
    saturation: number;
    contrast: number;
    brightness: number;
    hue: number;
  };
  performance: 'auto' | 'high' | 'low';
  shape: 'background' | 'orb';
  size: number | 'sm' | 'md' | 'lg';
  
  // Enhancement props - all required
  dropShadow: number | boolean;
  dropShadowDirection: { x: number; y: number };
  dropShadowOpacity: number;
  lighting3d: {
    enabled: boolean;
    position: { x: number; y: number };
    intensity: number;
  };
  
  // Final resolved config
  finalConfig: BackgroundConfig;
}

/**
 * Resolves final configuration by merging theme defaults with explicit props
 * Priority: explicit props > customConfig > theme defaults > fallback defaults
 */
export function resolveConfig(
  props: MeshGradientProps,
  theme?: ThemePack
): ResolvedConfig {
  if (!theme) {
    return {
      ...DEFAULTS,
      ...props,
      finalConfig: {
        backgroundColor: props.customConfig?.backgroundColor || DEFAULTS.finalConfig.backgroundColor,
        shapes: props.customConfig?.shapes || DEFAULTS.finalConfig.shapes,
        containerStyle: props.customConfig?.containerStyle || DEFAULTS.finalConfig.containerStyle,
      }
    } as ResolvedConfig;
  }
  
  // Extract theme defaults
  const themeDefaults = getThemeDefaults(theme);
  
  // Create final background config with proper priority
  const finalConfig: BackgroundConfig = {
    backgroundColor: props.customConfig?.backgroundColor || theme.backgroundColor,
    shapes: props.customConfig?.shapes || theme.shapes,
    containerStyle: props.customConfig?.containerStyle || DEFAULTS.finalConfig.containerStyle,
  };
  
  // Merge with priority: props > theme > fallbacks
  const resolved = {
    ...DEFAULTS,
    ...props,
    finalConfig,
    // Apply theme defaults for properties not explicitly set
    animated: props.animated ?? themeDefaults.animated ?? DEFAULTS.animated,
    animationType: props.animationType ?? themeDefaults.animationType ?? DEFAULTS.animationType,
    animationConfig: {
      ...DEFAULTS.animationConfig,
      ...(themeDefaults.animationConfig || {}),
      ...(props.animationConfig || {})
    },
    
    // Container animation: special case for backgrounds
    containerAnimation: resolveContainerAnimation(
      props.containerAnimation,
      themeDefaults.containerAnimation,
      props.shape
    ) || DEFAULTS.containerAnimation,
    containerAnimationConfig: {
      ...DEFAULTS.containerAnimationConfig,
      ...(themeDefaults.containerAnimationConfig || {}),
      ...(props.containerAnimationConfig || {})
    },
    
    visualEffects: {
      ...DEFAULTS.visualEffects,
      ...(themeDefaults.visualEffects || {}),
      ...(props.visualEffects || {})
    },
    
    dropShadow: props.dropShadow ?? themeDefaults.dropShadow ?? DEFAULTS.dropShadow,
    dropShadowOpacity: props.dropShadowOpacity ?? themeDefaults.dropShadowOpacity ?? DEFAULTS.dropShadowOpacity,
    dropShadowDirection: props.dropShadowDirection ?? themeDefaults.dropShadowDirection ?? DEFAULTS.dropShadowDirection,
    
    lighting3d: {
      ...DEFAULTS.lighting3d,
      ...(themeDefaults.lighting3d || {}),
      ...(props.lighting3d || {}),
      position: {
        ...DEFAULTS.lighting3d.position,
        ...(themeDefaults.lighting3d?.position || {}),
        ...(props.lighting3d?.position || {})
      },
      intensity: props.lighting3d?.intensity ?? themeDefaults.lighting3d?.intensity ?? DEFAULTS.lighting3d.intensity
    }
  };

  return resolved as ResolvedConfig;
}

/**
 * Extracts default values from a theme configuration
 */
export function getThemeDefaults(theme: ThemePack): Partial<MeshGradientProps> {
  return {
    animated: theme.animation?.enabled,
    animationType: theme.animation?.type,
    animationConfig: theme.animation ? {
      duration: theme.animation.duration,
      intensity: theme.animation.intensity,
      easing: theme.animation.easing
    } : undefined,
    containerAnimation: theme.containerAnimation?.type,
    containerAnimationConfig: theme.containerAnimation ? {
      duration: theme.containerAnimation.duration,
      easing: theme.containerAnimation.easing
    } : undefined,
    visualEffects: theme.visualEffects ? {
      saturation: theme.visualEffects.saturation ?? DEFAULTS.visualEffects.saturation,
      contrast: theme.visualEffects.contrast ?? DEFAULTS.visualEffects.contrast,
      brightness: theme.visualEffects.brightness ?? DEFAULTS.visualEffects.brightness,
      hue: theme.visualEffects.hue ?? DEFAULTS.visualEffects.hue
    } : undefined,
    dropShadow: theme.dropShadow?.enabled ? theme.dropShadow.size || true : undefined,
    dropShadowOpacity: theme.dropShadow?.opacity,
    dropShadowDirection: theme.dropShadow?.direction,
    lighting3d: theme.lighting3d
  };
}

/**
 * Special handling for container animation resolution
 * Background containers don't support rotation-based animations
 */
function resolveContainerAnimation(
  propValue: ContainerAnimationType | undefined,
  themeDefault: ContainerAnimationType | undefined,
  shape: string | undefined
): ContainerAnimationType | undefined {
  // If explicitly set via props, use that
  if (propValue !== undefined) {
    return propValue;
  }
  
  // Background containers don't support rotation-based animations
  // This includes both explicit 'background' shape and when no shape is specified (defaults to background)
  if (shape === 'background' || shape === undefined) {
    // Filter out rotation-based animations for backgrounds
    if (themeDefault === 'rotation' || themeDefault === 'hue-rotation') {
      return 'none';
    }
    // Allow other animations like 'hue'
    return themeDefault;
  }
  
  // Orbs support all container animations
  return themeDefault;
} 