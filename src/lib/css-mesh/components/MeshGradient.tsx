import React, { useRef, useEffect, useState } from 'react';
import type { MeshGradientProps } from '../types/component.types';
import type { BackgroundConfig } from '../types/theme.types';
import type { AnimationType, ContainerAnimationType } from '../types/animation.types';
import type { ShapeType, ShapeProperties } from '../types/theme.types';
import { getTheme } from '../themes';
import { generateAnimationKeyframes, getAnimationStyles, generateContainerAnimationKeyframes, getContainerAnimationStyles } from '../animations';
import { generateShapeStyles } from '../utils/shape-generator';

const MeshGradient: React.FC<MeshGradientProps> = ({
  theme = 'sunset',
  customConfig,
  className = '',
  style = {},
  children,
  animated = false,
  animationType = 'float',
  animationConfig,
  containerAnimation = 'none',
  containerAnimationConfig,
  mouseTracking,
  visualEffects,
  // onThemeChange, // TODO: Implement callback functionality
  performance = 'auto',
  shape = 'background',
  size,
  dropShadow,
  dropShadowOpacity = 0.4,
  dropShadowDirection = { x: 0, y: 8 },
  lighting3d,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400); // Default fallback
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Percentage-based position

  // Update container height when component mounts or resizes
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    
    // Listen for resize events
    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Mouse tracking setup
  useEffect(() => {
    if (!mouseTracking?.enabled || !containerRef.current) return;

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
    
    // Reset to center when mouse leaves
    const handleMouseLeave = () => {
      setMousePosition({ x: 50, y: 50 });
    };
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseTracking?.enabled]);

  // Get the base theme configuration
  const baseTheme = getTheme(theme);
  
  if (!baseTheme) {
    console.warn(`Theme "${theme}" not found, falling back to sunset`);
    const fallbackTheme = getTheme('sunset');
    if (!fallbackTheme) {
      throw new Error('Fallback theme "sunset" not found');
    }
  }
  
  const selectedTheme = baseTheme || getTheme('sunset')!;
  
  // Merge with custom configuration if provided
  const finalConfig: BackgroundConfig = {
    backgroundColor: customConfig?.backgroundColor || selectedTheme.backgroundColor,
    shapes: customConfig?.shapes || selectedTheme.shapes,
    containerStyle: customConfig?.containerStyle || {},
  };

  // Use theme's visual effects as defaults, allow override via props
  const defaultVisualEffects = selectedTheme.visualEffects || { saturation: 1, contrast: 1, brightness: 1, hue: 0 };
  const finalVisualEffects = visualEffects || defaultVisualEffects;

  // Use theme's lighting3d as default, allow override via props
  const defaultLighting3d = selectedTheme.lighting3d || { enabled: false };
  const finalLighting3d = lighting3d || defaultLighting3d;

  // Use theme's drop shadow as default, allow override via props
  const themeDropShadow = selectedTheme.dropShadow;
  const finalDropShadow = dropShadow !== undefined ? dropShadow : (themeDropShadow?.enabled ? (themeDropShadow.size || true) : false);
  const finalDropShadowOpacity = dropShadowOpacity !== undefined ? dropShadowOpacity : (themeDropShadow?.opacity || 0.4);
  const finalDropShadowDirection = dropShadowDirection !== undefined ? dropShadowDirection : (themeDropShadow?.direction || { x: 0, y: 8 });

  // Use theme's animation as default, allow override via props
  const themeAnimation = selectedTheme.animation;
  const themeContainerAnimation = selectedTheme.containerAnimation;
  
  // Determine if animations are enabled - use theme defaults if not explicitly set
  const finalAnimated = animated !== undefined ? animated : (themeAnimation?.enabled || false);
  const finalAnimationType = finalAnimated ? (animationType !== 'float' ? animationType : (themeAnimation?.type || 'float')) : 'none';
  const finalContainerAnimation = containerAnimation;
  
  // Create effective animation configs using theme defaults
  const effectiveAnimationConfig = {
    duration: animationConfig?.duration || themeAnimation?.duration || 10,
    intensity: animationConfig?.intensity || themeAnimation?.intensity || 1,
    easing: animationConfig?.easing || themeAnimation?.easing || 'ease-in-out',
  };
  
  const effectiveContainerAnimationConfig = {
    duration: containerAnimationConfig?.duration || (finalContainerAnimation !== 'none' ? themeContainerAnimation?.duration : undefined) || 10,
    easing: containerAnimationConfig?.easing || (finalContainerAnimation !== 'none' ? themeContainerAnimation?.easing : undefined) || 'linear',
  };

  // Determine final animation types
  const effectiveAnimationType: AnimationType = finalAnimated ? finalAnimationType : 'none';
  const effectiveContainerAnimation: ContainerAnimationType = finalContainerAnimation;
  

  
  // Apply performance optimizations
  const optimizedShapes = performance === 'low' 
    ? finalConfig.shapes.slice(0, 3) // Limit to 3 shapes for low performance
    : finalConfig.shapes;

  // Generate container animation styles
  const containerAnimationStyles = getContainerAnimationStyles(
    effectiveContainerAnimation,
    effectiveContainerAnimationConfig.duration
  );

  // Helper function to get size in pixels for orb mode
  const getOrbSize = (): number => {
    if (typeof size === 'number') return size;
    if (typeof size === 'string') {
      switch (size) {
        case 'sm': return 50;
        case 'md': return 80;
        case 'lg': return 120;
        default: return 80;
      }
    }
    return 80; // default
  };

  const isOrb = shape === 'orb';
  const orbSize = isOrb ? getOrbSize() : undefined;

  // Generate drop shadow styles
  const getDropShadowStyles = (): string => {
    if (!finalDropShadow) return 'none';
    
    const shadowSize = typeof finalDropShadow === 'number' ? finalDropShadow : (isOrb ? orbSize! * 0.2 : 20);
    const opacity = finalDropShadowOpacity;
    const direction = finalDropShadowDirection;
    
    // Create layered shadows for realistic depth with configurable direction
    const shadows = [
      `${direction.x}px ${direction.y + shadowSize * 0.5}px ${shadowSize * 1.5}px rgba(0, 0, 0, ${opacity})`,
      `${direction.x * 0.5}px ${direction.y + shadowSize * 0.2}px ${shadowSize * 0.8}px rgba(0, 0, 0, ${opacity * 0.8})`,
      `${direction.x * 0.3}px ${direction.y + shadowSize * 0.1}px ${shadowSize * 0.3}px rgba(0, 0, 0, ${opacity * 0.6})`
    ];
    
    return shadows.join(', ');
  };

  // Generate 3D lighting overlay - fixed position, not affected by container rotation
  const getLighting3dOverlay = (): React.CSSProperties | undefined => {
    if (!finalLighting3d.enabled) return undefined;
    
    const position = finalLighting3d.position || { x: 30, y: 30 };
    const intensity = finalLighting3d.intensity || 0.3;
    
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
        rgba(255, 255, 255, ${intensity * 0.5}) 0%, 
        rgba(255, 255, 255, ${intensity * 0.2}) 30%, 
        rgba(0, 0, 0, ${intensity * 0.1}) 70%, 
        transparent 100%)`,
      borderRadius: isOrb ? '50%' : undefined, // Match container shape
      zIndex: 500,
    };
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: finalConfig.backgroundColor,
    overflow: 'hidden', // Keep shapes clipped to container shape
    transform: 'translate3d(0, 0, 0)', // Force GPU acceleration for the container
    borderRadius: isOrb ? '50%' : undefined,
    ...finalConfig.containerStyle,
    ...containerAnimationStyles,
  };

  const getShapeBaseStyles = (shape: ShapeType = 'ellipse', shapeProps: ShapeProperties = {}) => {
    return generateShapeStyles(shape, shapeProps);
  };

  // Generate animation keyframes if needed, with intensity scaling
  const animationKeyframes = generateAnimationKeyframes(effectiveAnimationType, effectiveAnimationConfig.intensity);
  const containerKeyframes = generateContainerAnimationKeyframes(effectiveContainerAnimation);

  // Convert percentage blur to pixels based on container height
  const getBlurInPixels = (blurPercentage: number): number => {
    return Math.round((blurPercentage / 100) * containerHeight);
  };



  // Calculate mouse effect on ellipse position
  const getMouseOffset = (ellipseX: number, ellipseY: number): { x: number; y: number } => {
    if (!mouseTracking?.enabled) return { x: 0, y: 0 };

    const config = {
      mode: mouseTracking.mode || 'attract',
      intensity: mouseTracking.intensity || 0.3,
      radius: mouseTracking.radius || 30,
    };

    // Calculate distance from mouse to ellipse center
    const dx = mousePosition.x - ellipseX;
    const dy = mousePosition.y - ellipseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if ellipse is within effect radius
    if (distance > config.radius) return { x: 0, y: 0 };

    // Calculate effect strength (stronger when closer)
    const strength = (1 - distance / config.radius) * config.intensity;
    
    // Calculate direction multiplier
    const direction = config.mode === 'attract' ? 1 : -1;
    
    // Calculate offset (normalize direction and apply strength)
    const offsetX = (dx / distance) * strength * direction * 10; // 10% max offset
    const offsetY = (dy / distance) * strength * direction * 10;

    return { x: offsetX || 0, y: offsetY || 0 };
  };

  return (
    <div 
      ref={containerRef}
      data-testid="mesh-gradient"
      className={`css-mesh ${className}`} 
      style={{
        position: 'relative',
        width: isOrb ? `${orbSize}px` : '100%',
        height: isOrb ? `${orbSize}px` : '100%',
        backgroundColor: finalConfig.backgroundColor, // Apply background to outer container for tests and visual consistency
        boxShadow: getDropShadowStyles(), // Apply shadow to outer container so it doesn't rotate
        borderRadius: isOrb ? '50%' : undefined, // Match inner container shape for shadows
        ...style,
      }}
    >
      {/* Inject animation keyframes */}
      {(animationKeyframes || containerKeyframes) && (
        <style>
          {animationKeyframes}
          {containerKeyframes}
        </style>
      )}
      
      {/* Animated container with shapes */}
      <div style={containerStyles}>
        {optimizedShapes.map((shape, index) => {
          const animationStyles = getAnimationStyles(
            effectiveAnimationType, 
            index,
            effectiveAnimationConfig.duration
          );
          
          const blurInPixels = getBlurInPixels(shape.blur);
          const shapeType = shape.shape || 'ellipse';
          
          // Calculate mouse effect offset
          const mouseOffset = getMouseOffset(shape.x + shape.width / 2, shape.y + shape.height / 2);
          
          // Apply visual effects to the filter (all shapes use standard filter now)
          const filterEffects = `blur(${blurInPixels}px) saturate(${finalVisualEffects.saturation}) contrast(${finalVisualEffects.contrast}) brightness(${finalVisualEffects.brightness}) hue-rotate(${finalVisualEffects.hue}deg)`;
          
          // Combine GPU acceleration with animation and mouse transforms
          const mouseTransform = mouseOffset.x !== 0 || mouseOffset.y !== 0 
            ? `translate(${mouseOffset.x}%, ${mouseOffset.y}%)` 
            : '';
          
          const baseTransform = 'translate3d(0, 0, 0)';
          const animTransform = animationStyles.transform || '';
          const finalTransform = [baseTransform, animTransform, mouseTransform]
            .filter(Boolean)
            .join(' ');
          
          // Generate shape-specific styles
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
                // Override any transform from animationStyles to include mouse effects
                transform: finalTransform,
                // Smooth transitions for mouse effects
                transition: mouseTracking?.enabled ? 'transform 0.1s ease-out' : undefined,
              }}
            />
          );
        })}
        
        {children && (
          <div style={{ position: 'relative', zIndex: 1000 }}>
            {children}
          </div>
        )}
      </div>
      
      {/* 3D Lighting Overlay - Fixed position, outside rotations */}
      {finalLighting3d.enabled && (
        <div style={getLighting3dOverlay()} />
      )}
    </div>
  );
};

export default MeshGradient; 