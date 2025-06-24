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
export const generateRotationKeyframes = (): string => {
  return `
    @keyframes ${ROTATION_ANIMATION.name} {
      0% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(90deg) scale(1.05); }
      50% { transform: rotate(180deg) scale(1); }
      75% { transform: rotate(270deg) scale(0.95); }
      100% { transform: rotate(360deg) scale(1); }
    }
  `;
}; 