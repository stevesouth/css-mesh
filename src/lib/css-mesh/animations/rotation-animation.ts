import type { AnimationDefinition } from '../types/animation.types';

// Rotation animation - spinning motion with pulsing speed
export const ROTATION_ANIMATION: AnimationDefinition = {
  name: 'css-mesh-rotation',
  keyframes: [
    { percent: 0, transform: 'rotate(0deg) scale(1)' },
    { percent: 5, transform: 'rotate(10deg) scale(1)' },
    { percent: 15, transform: 'rotate(60deg) scale(1)' },
    { percent: 25, transform: 'rotate(90deg) scale(1)' },
    { percent: 35, transform: 'rotate(110deg) scale(1)' },
    { percent: 50, transform: 'rotate(180deg) scale(1)' },
    { percent: 60, transform: 'rotate(200deg) scale(1)' },
    { percent: 70, transform: 'rotate(250deg) scale(1)' },
    { percent: 80, transform: 'rotate(290deg) scale(1)' },
    { percent: 90, transform: 'rotate(330deg) scale(1)' },
    { percent: 100, transform: 'rotate(360deg) scale(1)' }
  ],
  duration: 20,
  easing: 'linear',
  iterationCount: 'infinite'
};

// Generate CSS keyframes for rotation animation with pulsing speed
export const generateRotationKeyframes = (intensity: number = 1): string => {
  const i = Math.max(0.1, Math.min(2, intensity)); // Clamp intensity between 0.1 and 2
  
  return `
    @keyframes css-mesh-rotation {
      0% { 
        transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
      }
      5% { 
        transform: translate3d(${0.2 * i}%, ${-0.2 * i}%, 0) rotate(${10 * i}deg) scale(1);
      }
      15% { 
        transform: translate3d(${0.4 * i}%, ${-0.4 * i}%, 0) rotate(${60 * i}deg) scale(1);
      }
      25% { 
        transform: translate3d(${0.5 * i}%, ${-0.5 * i}%, 0) rotate(${90 * i}deg) scale(1);
      }
      35% { 
        transform: translate3d(${0.3 * i}%, ${-0.7 * i}%, 0) rotate(${110 * i}deg) scale(1);
      }
      50% { 
        transform: translate3d(0, 0, 0) rotate(${180 * i}deg) scale(1);
      }
      60% { 
        transform: translate3d(${-0.2 * i}%, ${0.2 * i}%, 0) rotate(${200 * i}deg) scale(1);
      }
      70% { 
        transform: translate3d(${-0.4 * i}%, ${0.4 * i}%, 0) rotate(${250 * i}deg) scale(1);
      }
      80% { 
        transform: translate3d(${-0.5 * i}%, ${0.5 * i}%, 0) rotate(${290 * i}deg) scale(1);
      }
      90% { 
        transform: translate3d(${-0.2 * i}%, ${0.4 * i}%, 0) rotate(${330 * i}deg) scale(1);
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