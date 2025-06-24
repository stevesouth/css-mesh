import type { AnimationDefinition } from '../types/animation.types';

// Morph animation definition
export const MORPH_ANIMATION: AnimationDefinition = {
  name: 'css-mesh-morph',
  duration: 8,
  easing: 'ease-in-out',
  iterationCount: 'infinite',
  keyframes: [
    {
      percent: 0,
      transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
    },
    {
      percent: 25,
      transform: 'translate3d(2%, 1%, 0) scale(1.05) rotate(90deg)',
    },
    {
      percent: 50,
      transform: 'translate3d(1%, -2%, 0) scale(0.97) rotate(180deg)',
    },
    {
      percent: 75,
      transform: 'translate3d(-1.5%, 0.5%, 0) scale(1.02) rotate(270deg)',
    },
    {
      percent: 100,
      transform: 'translate3d(0, 0, 0) scale(1) rotate(360deg)',
    },
  ],
};

export const generateMorphKeyframes = (intensity: number = 1): string => {
  const i = Math.max(0.1, Math.min(2, intensity)); // Clamp intensity between 0.1 and 2
  
  return `
    @keyframes css-mesh-morph {
      0% { 
        transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      }
      25% { 
        transform: translate3d(${2 * i}%, ${1 * i}%, 0) scale(${1 + 0.05 * i}) rotate(${90 * i}deg);
      }
      50% { 
        transform: translate3d(${1 * i}%, ${-2 * i}%, 0) scale(${1 - 0.03 * i}) rotate(${180 * i}deg);
      }
      75% { 
        transform: translate3d(${-1.5 * i}%, ${0.5 * i}%, 0) scale(${1 + 0.02 * i}) rotate(${270 * i}deg);
      }
      100% { 
        transform: translate3d(0, 0, 0) scale(1) rotate(${360 * i}deg);
      }
    }
  `;
};

export const getMorphAnimationStyles = (index: number, duration?: number): React.CSSProperties => {
  const effectiveDuration = duration || 8; // Slower default for smoother morphing
  const delay = index * 0.8; // Staggered start
  
  return {
    animation: `css-mesh-morph ${effectiveDuration}s ease-in-out ${delay}s infinite`,
    transformOrigin: 'center center',
  };
}; 