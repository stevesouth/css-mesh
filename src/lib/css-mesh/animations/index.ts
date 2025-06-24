import { FLOAT_ANIMATION, generateFloatKeyframes } from './float-animation';
import { PULSE_ANIMATION, generatePulseKeyframes } from './pulse-animation';
import { WAVE_ANIMATION, generateWaveKeyframes } from './wave-animation';
import { ROTATION_ANIMATION, generateRotationKeyframes } from './rotation-animation';
import { ORBIT_ANIMATION, generateOrbitKeyframes } from './orbit-animation';
import { MORPH_ANIMATION, generateMorphKeyframes } from './morph-animation';
import type { AnimationType, ContainerAnimationType, AnimationDefinition } from '../types/animation.types';

// Animation registry for individual shapes
export const ANIMATIONS: Record<AnimationType, AnimationDefinition | null> = {
  none: null,
  float: FLOAT_ANIMATION,
  pulse: PULSE_ANIMATION,
  wave: WAVE_ANIMATION,
  rotation: ROTATION_ANIMATION,
  orbit: ORBIT_ANIMATION,
  morph: MORPH_ANIMATION,
};

// Container animation keyframes
export const CONTAINER_ANIMATIONS: Record<ContainerAnimationType, string | null> = {
  none: null,
  hue: `
    @keyframes css-mesh-container-hue {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `,
};

// Keyframe generators for ellipse animations
export const KEYFRAME_GENERATORS: Record<string, (intensity?: number) => string> = {
  float: generateFloatKeyframes,
  pulse: generatePulseKeyframes,
  wave: generateWaveKeyframes,
  rotation: generateRotationKeyframes,
  orbit: generateOrbitKeyframes,
  morph: generateMorphKeyframes,
};

// Get animation definition by type
export const getAnimation = (type: AnimationType): AnimationDefinition | null => {
  return ANIMATIONS[type];
};

// Generate CSS keyframes for an animation type with intensity scaling
export const generateAnimationKeyframes = (type: AnimationType, intensity: number = 1): string => {
  if (type === 'none') return '';
  
  const generator = KEYFRAME_GENERATORS[type];
  if (!generator) return '';
  
  // For newer animations that support intensity natively, pass it directly
  if (type === 'morph') {
    return generator(intensity);
  }
  
  // Generate base keyframes for older animations
  const baseKeyframes = generator();
  
  // If intensity is 1, return as-is
  if (intensity === 1) return baseKeyframes;
  
  // Scale animation values based on intensity
  return baseKeyframes.replace(
    /translate\(([^)]+)\)/g,
    (_match, values) => {
      const coords = values.split(',').map((v: string) => {
        const num = parseFloat(v.trim().replace('px', ''));
        return `${num * intensity}px`;
      });
      return `translate(${coords.join(', ')})`;
    }
  ).replace(
    /rotate\(([^)]+)\)/g,
    (_match, value) => {
      const deg = parseFloat(value.replace('deg', ''));
      return `rotate(${deg * intensity}deg)`;
    }
  ).replace(
    /scale\(([^)]+)\)/g,
    (_match, value) => {
      const scale = parseFloat(value);
      const scaledValue = 1 + ((scale - 1) * intensity);
      return `scale(${scaledValue})`;
    }
  );
};

// Get animation CSS properties for an element
export const getAnimationStyles = (
  type: AnimationType,
  index: number = 0,
  configuredDuration?: number
): React.CSSProperties => {
  if (type === 'none') return {};
  
  const animation = getAnimation(type);
  if (!animation) return {};
  
  const delay = index * 1.5; // 1.5 second stagger between shapes
  const duration = configuredDuration || animation.duration;
  
  return {
    animation: `${animation.name} ${duration}s ${animation.easing} infinite`,
    animationDelay: `${delay}s`,
    transformOrigin: 'center center',
  };
};

// Generate container animation keyframes
export const generateContainerAnimationKeyframes = (type: ContainerAnimationType): string => {
  if (type === 'none') return '';
  return CONTAINER_ANIMATIONS[type] || '';
};

// Get container animation CSS properties
export const getContainerAnimationStyles = (
  type: ContainerAnimationType,
  duration: number = 10
): React.CSSProperties => {
  if (type === 'none') return {};
  
  const animationName = type === 'hue' ? 'css-mesh-container-hue' : '';
  if (!animationName) return {};
  
  return {
    animation: `${animationName} ${duration}s linear infinite`,
  };
};

// Export individual animations
export { FLOAT_ANIMATION, PULSE_ANIMATION, WAVE_ANIMATION, ROTATION_ANIMATION, ORBIT_ANIMATION, MORPH_ANIMATION };
export { generateFloatKeyframes, generatePulseKeyframes, generateWaveKeyframes, generateRotationKeyframes, generateOrbitKeyframes, generateMorphKeyframes }; 