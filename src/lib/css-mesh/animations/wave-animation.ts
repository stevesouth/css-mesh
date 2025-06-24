import type { AnimationDefinition } from '../types/animation.types';

// Wave animation - synchronized wave-like movement
export const WAVE_ANIMATION: AnimationDefinition = {
  name: 'css-mesh-wave',
  keyframes: [
    { percent: 0, transform: 'translate(0px, 0px)' },
    { percent: 25, transform: 'translate(15px, -10px)' },
    { percent: 50, transform: 'translate(0px, -20px)' },
    { percent: 75, transform: 'translate(-15px, -10px)' },
    { percent: 100, transform: 'translate(0px, 0px)' }
  ],
  duration: 8,
  easing: 'ease-in-out',
  iterationCount: 'infinite'
};

// Generate CSS keyframes for wave animation
export const generateWaveKeyframes = (): string => {
  return `
    @keyframes ${WAVE_ANIMATION.name} {
      0% { transform: translate(0px, 0px); }
      25% { transform: translate(15px, -10px); }
      50% { transform: translate(0px, -20px); }
      75% { transform: translate(-15px, -10px); }
      100% { transform: translate(0px, 0px); }
    }
  `;
}; 