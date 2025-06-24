import type { AnimationDefinition } from '../types/animation.types';

// Orbit animation - shapes orbit around invisible anchor points
export const ORBIT_ANIMATION: AnimationDefinition = {
  name: 'css-mesh-orbit',
  keyframes: [
    { percent: 0, transform: 'translate(0px, 0px) rotate(0deg)' },
    { percent: 25, transform: 'translate(25px, -25px) rotate(90deg)' },
    { percent: 50, transform: 'translate(0px, -50px) rotate(180deg)' },
    { percent: 75, transform: 'translate(-25px, -25px) rotate(270deg)' },
    { percent: 100, transform: 'translate(0px, 0px) rotate(360deg)' }
  ],
  duration: 15,
  easing: 'ease-in-out',
  iterationCount: 'infinite'
};

// Generate CSS keyframes for orbit animation
export const generateOrbitKeyframes = (): string => {
  return `
    @keyframes ${ORBIT_ANIMATION.name} {
      0% { transform: translate(0px, 0px) rotate(0deg); }
      25% { transform: translate(25px, -25px) rotate(90deg); }
      50% { transform: translate(0px, -50px) rotate(180deg); }
      75% { transform: translate(-25px, -25px) rotate(270deg); }
      100% { transform: translate(0px, 0px) rotate(360deg); }
    }
  `;
}; 