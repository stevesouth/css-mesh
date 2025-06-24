import type { AnimationDefinition } from '../types/animation.types';

// Current gentle floating animation
export const FLOAT_ANIMATION: AnimationDefinition = {
  name: 'float',
  duration: 20,
  easing: 'ease-in-out',
  iterationCount: 'infinite',
  keyframes: [
    {
      percent: 0,
      transform: 'translateY(0px) translateX(0px) scale(1)',
    },
    {
      percent: 25,
      transform: 'translateY(-10px) translateX(5px) scale(1.02)',
    },
    {
      percent: 50,
      transform: 'translateY(5px) translateX(-5px) scale(0.98)',
    },
    {
      percent: 75,
      transform: 'translateY(-5px) translateX(10px) scale(1.01)',
    },
    {
      percent: 100,
      transform: 'translateY(0px) translateX(0px) scale(1)',
    },
  ],
};

// Generate CSS keyframes string
export const generateFloatKeyframes = (): string => {
  const keyframeString = FLOAT_ANIMATION.keyframes
    .map(frame => `${frame.percent}% { transform: ${frame.transform}; }`)
    .join('\n    ');
  
  return `
    @keyframes ${FLOAT_ANIMATION.name} {
      ${keyframeString}
    }
  `;
}; 