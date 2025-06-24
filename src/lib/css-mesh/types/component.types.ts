import React from 'react';
import type { BackgroundConfig } from './theme.types';
import type { AnimationType, AnimationConfig, ContainerAnimationType, ContainerAnimationConfig } from './animation.types';

// Mouse tracking configuration
export interface MouseTrackingConfig {
  enabled: boolean;
  mode: 'attract' | 'repel';
  intensity: number; // 0-1 scale
  radius: number; // percentage of container size
}

// Main component props interface
export interface MeshGradientProps {
  theme?: string;
  customConfig?: Partial<BackgroundConfig>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  animated?: boolean;
  animationType?: AnimationType;
  animationConfig?: Partial<AnimationConfig>;
  containerAnimation?: ContainerAnimationType;
  containerAnimationConfig?: Partial<ContainerAnimationConfig>;
  mouseTracking?: Partial<MouseTrackingConfig>;
  visualEffects?: {
    saturation: number;
    contrast: number;
    brightness: number;
    hue: number;
  };
  onThemeChange?: (themeName: string) => void;
  performance?: 'auto' | 'high' | 'low';
}

// Demo component props
export interface MeshGradientDemoProps {
  showControls?: boolean;
  showThemeGrid?: boolean;
  showCodeExamples?: boolean;
  initialTheme?: string;
  onThemeSelect?: (themeName: string) => void;
  onAnimationChange?: (animated: boolean, animationType: AnimationType) => void;
  onCustomConfigChange?: (showCustom: boolean, customConfig?: Partial<BackgroundConfig>) => void;
}

// Animation control props
export interface AnimationControlProps {
  animationType: AnimationType;
  isPlaying: boolean;
  speed: number;
  onAnimationTypeChange: (type: AnimationType) => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
}

// Theme selector props
export interface ThemeSelectorProps {
  themes: string[];
  selectedTheme: string;
  onThemeChange: (themeName: string) => void;
  displayMode?: 'dropdown' | 'grid' | 'list';
}

// Legacy aliases for backward compatibility (can be removed in future versions)
export type ConfigurableBackgroundProps = MeshGradientProps;
export type BackgroundDemoProps = MeshGradientDemoProps; 