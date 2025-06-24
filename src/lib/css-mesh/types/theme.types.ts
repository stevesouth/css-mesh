import React from 'react';

// Available shape types
export type ShapeType = 
  | 'ellipse'      // Ellipse (can be made circular with equal width/height)
  | 'rectangle';   // Rectangle (can be rounded with borderRadius)

// Shape-specific properties
export interface ShapeProperties {
  // For rectangles
  borderRadius?: number | string; // e.g., 8, '50%', '8px 16px' - 0 for sharp, >0 for rounded
}

// Configuration for individual shape elements (was EllipseConfig)
export interface ShapeConfig {
  id: string;
  width: number; // percentage
  height: number; // percentage
  x: number; // percentage from left
  y: number; // percentage from top
  gradient: string;
  blur: number; // percentage of container height
  opacity?: number;
  zIndex?: number;
  shape?: ShapeType; // defaults to 'ellipse' for backward compatibility
  shapeProps?: ShapeProperties; // shape-specific configuration
}

// Legacy alias for backward compatibility
export type EllipseConfig = ShapeConfig;

// Complete background configuration
export interface BackgroundConfig {
  shapes: ShapeConfig[];
  backgroundColor?: string;
  containerStyle?: React.CSSProperties;
}

// Visual effects configuration
export interface VisualEffects {
  saturation?: number;
  contrast?: number;
  brightness?: number;
  hue?: number;
}

// 3D lighting configuration
export interface Lighting3D {
  enabled: boolean;
  position?: { x: number; y: number };
  intensity?: number;
}

// Drop shadow configuration
export interface DropShadow {
  enabled: boolean;
  size?: number;
  opacity?: number;
  direction?: { x: number; y: number };
}

// Theme pack definition
export interface ThemePack {
  backgroundColor: string;
  shapes: ShapeConfig[];
  visualEffects?: VisualEffects;
  lighting3d?: Lighting3D;
  dropShadow?: DropShadow;
}

// Collection of all theme packs
export interface ThemeCollection {
  [themeName: string]: ThemePack;
} 