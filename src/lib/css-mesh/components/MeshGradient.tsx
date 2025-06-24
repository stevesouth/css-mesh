import React, { useRef, useEffect, useState } from 'react';
import type { MeshGradientProps } from '../types/component.types';
import type { AnimationType, ContainerAnimationType } from '../types/animation.types';
import type { ShapeType, ShapeProperties } from '../types/theme.types';
import { getTheme } from '../themes';
import { resolveConfig } from '../utils/config-resolver';
import { generateAnimationKeyframes, getAnimationStyles, generateContainerAnimationKeyframes, getContainerAnimationStyles } from '../animations';
import { generateShapeStyles } from '../utils/shape-generator';

const MeshGradient: React.FC<MeshGradientProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Resolve all configuration
  const baseTheme = getTheme(props.theme || 'sunset');
  if (!baseTheme) {
    console.warn(`Theme "${props.theme}" not found, falling back to sunset`);
  }
  const fallbackTheme = baseTheme || getTheme('sunset')!;
  const config = resolveConfig(props, fallbackTheme);

  // Update container height when component mounts or resizes
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    
    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Mouse tracking setup
  useEffect(() => {
    if (!config.mouseTracking?.enabled || !containerRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseMove);
    
    const handleMouseLeave = () => {
      setMousePosition({ x: 50, y: 50 });
    };
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [config.mouseTracking?.enabled]);

  // Determine final animation types
  const animationType: AnimationType = config.animated ? config.animationType : 'none';
  const containerAnimation: ContainerAnimationType = config.containerAnimation;

  // Apply performance optimizations
  const shapes = (config.performance === 'low') 
    ? config.finalConfig.shapes.slice(0, 3)
    : config.finalConfig.shapes;

  // Generate container animation styles
  const containerAnimationStyles = getContainerAnimationStyles(
    containerAnimation,
    config.containerAnimationConfig.duration
  );

  // Helper function to get size in pixels for orb mode
  const getOrbSize = (): number => {
    if (typeof config.size === 'number') return config.size;
    if (typeof config.size === 'string') {
      switch (config.size) {
        case 'sm': return 50;
        case 'md': return 80;
        case 'lg': return 120;
        default: return 80;
      }
    }
    return config.size;
  };

  const isOrb = config.shape === 'orb';
  const orbSize = isOrb ? getOrbSize() : undefined;

  // Generate drop shadow styles
  const getDropShadowStyles = (): string => {
    if (!config.dropShadow) return 'none';
    
    const shadowSize = typeof config.dropShadow === 'number' ? config.dropShadow : (isOrb ? orbSize! * 0.2 : 20);
    
    const shadows = [
      `${config.dropShadowDirection.x}px ${config.dropShadowDirection.y + shadowSize * 0.5}px ${shadowSize * 1.5}px rgba(0, 0, 0, ${config.dropShadowOpacity})`,
      `${config.dropShadowDirection.x * 0.5}px ${config.dropShadowDirection.y + shadowSize * 0.2}px ${shadowSize * 0.8}px rgba(0, 0, 0, ${config.dropShadowOpacity * 0.8})`,
      `${config.dropShadowDirection.x * 0.3}px ${config.dropShadowDirection.y + shadowSize * 0.1}px ${shadowSize * 0.3}px rgba(0, 0, 0, ${config.dropShadowOpacity * 0.6})`
    ];
    
    return shadows.join(', ');
  };

  // Generate 3D lighting overlay
  const getLighting3dOverlay = (): React.CSSProperties | undefined => {
    if (!config.lighting3d.enabled) return undefined;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      background: `radial-gradient(circle at ${config.lighting3d.position.x}% ${config.lighting3d.position.y}%, 
        rgba(255, 255, 255, ${config.lighting3d.intensity * 0.5}) 0%, 
        rgba(255, 255, 255, ${config.lighting3d.intensity * 0.2}) 30%, 
        rgba(0, 0, 0, ${config.lighting3d.intensity * 0.1}) 70%, 
        transparent 100%)`,
      borderRadius: isOrb ? '50%' : undefined,
      zIndex: 500,
    };
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: config.finalConfig.backgroundColor,
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    borderRadius: isOrb ? '50%' : undefined,
    ...config.finalConfig.containerStyle,
    ...containerAnimationStyles,
  };

  const getShapeBaseStyles = (shape: ShapeType = 'ellipse', shapeProps: ShapeProperties = {}) => {
    return generateShapeStyles(shape, shapeProps);
  };

  // Generate animation keyframes
  const animationKeyframes = generateAnimationKeyframes(animationType, config.animationConfig.intensity);
  const containerKeyframes = generateContainerAnimationKeyframes(containerAnimation);

  // Convert percentage blur to pixels based on container height
  const getBlurInPixels = (blurPercentage: number): number => {
    return Math.round((blurPercentage / 100) * containerHeight);
  };

  // Calculate mouse effect on ellipse position
  const getMouseOffset = (ellipseX: number, ellipseY: number): { x: number; y: number } => {
    if (!config.mouseTracking.enabled) return { x: 0, y: 0 };

    const dx = mousePosition.x - ellipseX;
    const dy = mousePosition.y - ellipseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > config.mouseTracking.radius) return { x: 0, y: 0 };

    const strength = (1 - distance / config.mouseTracking.radius) * config.mouseTracking.intensity;
    const direction = config.mouseTracking.mode === 'attract' ? 1 : -1;
    
    const offsetX = (dx / distance) * strength * direction * 10;
    const offsetY = (dy / distance) * strength * direction * 10;

    return { x: offsetX || 0, y: offsetY || 0 };
  };

  return (
    <div 
      ref={containerRef}
      data-testid="mesh-gradient"
      className={`css-mesh ${config.className}`} 
      style={{
        position: 'relative',
        width: isOrb ? `${orbSize}px` : '100%',
        height: isOrb ? `${orbSize}px` : '100%',
        backgroundColor: config.finalConfig.backgroundColor,
        boxShadow: getDropShadowStyles(),
        borderRadius: isOrb ? '50%' : undefined,
        ...config.style,
      }}
    >
      {(animationKeyframes || containerKeyframes) && (
        <style>
          {animationKeyframes}
          {containerKeyframes}
        </style>
      )}
      
      <div style={containerStyles}>
        {shapes.map((shape, index) => {
          const animationStyles = getAnimationStyles(
            animationType, 
            index,
            config.animationConfig.duration
          );
          
          const blurInPixels = getBlurInPixels(shape.blur);
          const shapeType = shape.shape || 'ellipse';
          
          const mouseOffset = getMouseOffset(shape.x + shape.width / 2, shape.y + shape.height / 2);
          
          const filterEffects = `blur(${blurInPixels}px) saturate(${config.visualEffects.saturation}) contrast(${config.visualEffects.contrast}) brightness(${config.visualEffects.brightness}) hue-rotate(${config.visualEffects.hue}deg)`;
          
          const mouseTransform = mouseOffset.x !== 0 || mouseOffset.y !== 0 
            ? `translate(${mouseOffset.x}%, ${mouseOffset.y}%)` 
            : '';
          
          const baseTransform = 'translate3d(0, 0, 0)';
          const animTransform = animationStyles.transform || '';
          const finalTransform = [baseTransform, animTransform, mouseTransform]
            .filter(Boolean)
            .join(' ');
          
          const shapeStyles = getShapeBaseStyles(shapeType, shape.shapeProps || {});
          
          return (
            <div
              key={shape.id}
              data-testid={`mesh-ellipse-${shape.id}`}
              style={{
                ...shapeStyles,
                width: `${shape.width}%`,
                height: `${shape.height}%`,
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                background: shape.gradient,
                filter: filterEffects,
                opacity: shape.opacity || 1,
                zIndex: shape.zIndex || index,
                ...animationStyles,
                transform: finalTransform,
                transition: config.mouseTracking.enabled ? 'transform 0.1s ease-out' : undefined,
              }}
            />
          );
        })}
        
        {config.children && (
          <div style={{ position: 'relative', zIndex: 1000 }}>
            {config.children}
          </div>
        )}
      </div>
      
      {config.lighting3d.enabled && (
        <div style={getLighting3dOverlay()} />
      )}
    </div>
  );
};

export default MeshGradient; 