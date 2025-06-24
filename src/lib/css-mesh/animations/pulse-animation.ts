import type { AnimationDefinition } from '../types/animation.types';

// Breathing/pulsing animation
export const PULSE_ANIMATION: AnimationDefinition = {
  name: 'pulse',
  duration: 8,
  easing: 'ease-in-out',
  iterationCount: 'infinite',
  keyframes: [
    {
      percent: 0,
      transform: 'scale(1) translateY(0px)',
    },
    {
      percent: 50,
      transform: 'scale(1.08) translateY(-3px)',
    },
    {
      percent: 100,
      transform: 'scale(1) translateY(0px)',
    },
  ],
};

// Generate CSS keyframes string for pulse
export const generatePulseKeyframes = (): string => {
  const keyframeString = PULSE_ANIMATION.keyframes
    .map(frame => `${frame.percent}% { transform: ${frame.transform}; }`)
    .join('\n    ');
  
  return `
    @keyframes ${PULSE_ANIMATION.name} {
      ${keyframeString}
    }
  `;
}; 