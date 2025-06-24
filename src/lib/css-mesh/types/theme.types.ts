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

// Theme pack definition
export interface ThemePack {
  backgroundColor: string;
  shapes: ShapeConfig[];
}

// Collection of all theme packs
export interface ThemeCollection {
  [themeName: string]: ThemePack;
} 