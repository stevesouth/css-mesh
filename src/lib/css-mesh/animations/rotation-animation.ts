import type { AnimationDefinition } from '../types/animation.types';

// Rotation animation - slow spinning motion around center
export const ROTATION_ANIMATION: AnimationDefinition = {
  name: 'css-mesh-rotation',
  keyframes: [
    { percent: 0, transform: 'rotate(0deg) scale(1)' },
    { percent: 25, transform: 'rotate(90deg) scale(1.05)' },
    { percent: 50, transform: 'rotate(180deg) scale(1)' },
    { percent: 75, transform: 'rotate(270deg) scale(0.95)' },
    { percent: 100, transform: 'rotate(360deg) scale(1)' }
  ],
  duration: 20,
  easing: 'linear',
  iterationCount: 'infinite'
};

// Generate CSS keyframes for rotation animation
export const generateRotationKeyframes = (intensity: number = 1): string => {
  const i = Math.max(0.1, Math.min(2, intensity)); // Clamp intensity between 0.1 and 2
  
  return `
    @keyframes css-mesh-rotation {
      0% { 
        transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
      }
      25% { 
        transform: translate3d(${0.5 * i}%, ${-0.5 * i}%, 0) rotate(${90 * i}deg) scale(${1 + 0.02 * i});
      }
      50% { 
        transform: translate3d(0, 0, 0) rotate(${180 * i}deg) scale(${1 - 0.01 * i});
      }
      75% { 
        transform: translate3d(${-0.5 * i}%, ${0.5 * i}%, 0) rotate(${270 * i}deg) scale(${1 + 0.01 * i});
      }
      100% { 
        transform: translate3d(0, 0, 0) rotate(${360 * i}deg) scale(1);
      }
    }
  `;
};

export const getRotationAnimationStyles = (index: number, duration?: number): React.CSSProperties => {
  const effectiveDuration = duration || 12; // Slow, smooth rotation
  const delay = index * 1.2; // Different rotation phases
  
  return {
    animation: `css-mesh-rotation ${effectiveDuration}s linear ${delay}s infinite`,
    transformOrigin: 'center center',
  };
}; 