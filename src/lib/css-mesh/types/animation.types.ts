import React from 'react';

// Available animation types for individual shapes
export type AnimationType = 'none' | 'float' | 'pulse' | 'wave' | 'rotation' | 'orbit' | 'morph';

// Available container-level animation types
export type ContainerAnimationType = 'none' | 'hue' | 'rotation' | 'hue-rotation';

// Animation configuration for shapes
export interface AnimationConfig {
  type: AnimationType;
  duration: number; // seconds
  delay?: number; // seconds between ellipse start times
  easing?: string; // CSS easing function
  intensity?: number; // 0-1 scale for animation strength
}

// Container animation configuration
export interface ContainerAnimationConfig {
  type: ContainerAnimationType;
  duration: number; // seconds
  easing?: string; // CSS easing function
}

// Individual animation keyframe
export interface AnimationKeyframe {
  percent: number;
  transform: string;
}

// Complete animation definition
export interface AnimationDefinition {
  name: string;
  keyframes: AnimationKeyframe[];
  duration: number;
  easing: string;
  iterationCount: string;
}

// Animation styles that get applied to elements
export interface AnimationStyles extends React.CSSProperties {
  animation?: string;
  animationDelay?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
} 