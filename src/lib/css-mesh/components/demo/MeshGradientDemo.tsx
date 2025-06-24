import React, { useState, useEffect } from 'react';
import MeshGradient from '../MeshGradient';
import { Sidebar, CodeGenerator, ThemeGrid, FeaturesSection, ChatPreview } from '.';
import { ALL_THEMES, isLightTheme } from '../../themes';
import { getThemeDefaults } from '../../utils/config-resolver';
import type { BackgroundConfig, ShapeConfig } from '../../types/theme.types';
import type { MeshGradientDemoProps } from '../../types/component.types';
import type { AnimationType, ContainerAnimationType } from '../../types/animation.types';

const MeshGradientDemo: React.FC<MeshGradientDemoProps> = ({
  showControls = true,
  showThemeGrid = true,
  showCodeExamples = true,
  initialTheme = 'sunset',
  onThemeSelect,
  onAnimationChange,
  onCustomConfigChange,
}) => {
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [backgroundColor, setBackgroundColor] = useState(ALL_THEMES[initialTheme]?.backgroundColor || '#1a1a2e');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('float');
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  const [animationIntensity, setAnimationIntensity] = useState(1.0);
  const [containerAnimation, setContainerAnimation] = useState<ContainerAnimationType>('none');
  const [containerAnimationSpeed, setContainerAnimationSpeed] = useState(1.0);
  const [mouseTracking, setMouseTracking] = useState<{
    enabled: boolean;
    mode: 'attract' | 'repel';
    intensity: number;
    radius: number;
  }>({
    enabled: false,
    mode: 'attract',
    intensity: 0.3,
    radius: 30,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Display mode state
  const [displayMode, setDisplayMode] = useState<'background' | 'orb'>('background');
  const [orbSize, setOrbSize] = useState(80);
  
  // Visual effects state
  const [visualEffects, setVisualEffects] = useState({
    saturation: 1.0,
    contrast: 1.0,
    brightness: 1.0,
    hue: 0,
  });

  // Visual enhancement state
  const [dropShadow, setDropShadow] = useState<number | boolean>(false);
  const [dropShadowOpacity, setDropShadowOpacity] = useState(0.4);
  const [dropShadowDirection, setDropShadowDirection] = useState({ x: 0, y: 8 });
  const [lighting3d, setLighting3d] = useState({
    enabled: false,
    position: { x: 30, y: 30 },
    intensity: 0.3,
  });
  
  // Dynamic shape state for editing - start with initial theme's shapes
  const [customShapes, setCustomShapes] = useState<ShapeConfig[]>(
    ALL_THEMES[initialTheme]?.shapes || []
  );

  // Initialize visual effects and lighting from the initial theme using config resolver
  useEffect(() => {
    const initialThemeData = ALL_THEMES[initialTheme];
    if (initialThemeData) {
      const themeDefaults = getThemeDefaults(initialThemeData);
      
      // Apply theme defaults for visual effects
      if (themeDefaults.visualEffects) {
        setVisualEffects({
          saturation: themeDefaults.visualEffects.saturation ?? 1.0,
          contrast: themeDefaults.visualEffects.contrast ?? 1.0,
          brightness: themeDefaults.visualEffects.brightness ?? 1.0,
          hue: themeDefaults.visualEffects.hue ?? 0,
        });
      }
      
      // Apply theme defaults for lighting
      if (themeDefaults.lighting3d) {
        setLighting3d({
          enabled: themeDefaults.lighting3d.enabled || false,
          position: themeDefaults.lighting3d.position || { x: 30, y: 30 },
          intensity: themeDefaults.lighting3d.intensity || 0.3,
        });
      }
      
      // Apply theme defaults for drop shadow
      if (themeDefaults.dropShadow !== undefined) {
        setDropShadow(themeDefaults.dropShadow);
      }
      if (themeDefaults.dropShadowOpacity !== undefined) {
        setDropShadowOpacity(themeDefaults.dropShadowOpacity);
      }
      if (themeDefaults.dropShadowDirection) {
        setDropShadowDirection(themeDefaults.dropShadowDirection);
      }
      
      // Apply theme defaults for animation
      if (themeDefaults.animated !== undefined) {
        setIsAnimated(themeDefaults.animated);
      }
      if (themeDefaults.animationType) {
        setAnimationType(themeDefaults.animationType);
      }
      if (themeDefaults.animationConfig) {
        setAnimationSpeed(themeDefaults.animationConfig.duration ? 10 / themeDefaults.animationConfig.duration : 1.0);
        setAnimationIntensity(themeDefaults.animationConfig.intensity || 1.0);
      }
      
      // Apply theme defaults for container animation  
      if (themeDefaults.containerAnimation) {
        setContainerAnimation(themeDefaults.containerAnimation);
      }
      if (themeDefaults.containerAnimationConfig) {
        setContainerAnimationSpeed(themeDefaults.containerAnimationConfig.duration ? 10 / themeDefaults.containerAnimationConfig.duration : 1.0);
      }
    }
  }, [initialTheme]);
  
  // Expandable sections state - all panels open by default
  const [expandedSections, setExpandedSections] = useState({
    themes: true,
    animation: true,
    containerAnimation: true,
    mouseTracking: true,
    shapes: true,
    effects: true,
    enhancements: true,
    orb: true,
  });

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleThemeChange = (theme: string) => {
    if (theme === 'custom') {
      // Switch to custom mode - start with blank slate
      setIsCustomMode(true);
      setSelectedTheme('custom');
      setBackgroundColor('#1a1a2e'); // Default dark background
      setCustomShapes([{
        id: 'shape-1',
        width: 80,
        height: 60,
        x: 20,
        y: 20,
        gradient: 'radial-gradient(ellipse, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
        blur: 20,
        opacity: 0.7,
        zIndex: 1,
        shape: 'ellipse',
      }]);
      // Reset to default visual effects for custom mode
      setVisualEffects({
        saturation: 1.0,
        contrast: 1.0,
        brightness: 1.0,
        hue: 0,
      });
      onThemeSelect?.(theme);
    } else {
      // Switch to theme mode - apply theme defaults using config resolver
      const themeData = ALL_THEMES[theme];
      if (!themeData) return;
      
      setIsCustomMode(false);
      setSelectedTheme(theme);
      setBackgroundColor(themeData.backgroundColor);
      
      // Reset shapes
      setCustomShapes([...themeData.shapes]);
      
      // Apply theme defaults using config resolver
      const themeDefaults = getThemeDefaults(themeData);
      
      // Apply visual effects defaults
      if (themeDefaults.visualEffects) {
        setVisualEffects({
          saturation: themeDefaults.visualEffects.saturation ?? 1.0,
          contrast: themeDefaults.visualEffects.contrast ?? 1.0,
          brightness: themeDefaults.visualEffects.brightness ?? 1.0,
          hue: themeDefaults.visualEffects.hue ?? 0,
        });
      } else {
        // Theme doesn't have visual effects, use defaults
        setVisualEffects({
          saturation: 1.0,
          contrast: 1.0,
          brightness: 1.0,
          hue: 0,
        });
      }

      // Apply lighting3d defaults
      if (themeDefaults.lighting3d) {
        setLighting3d({
          enabled: themeDefaults.lighting3d.enabled || false,
          position: themeDefaults.lighting3d.position || { x: 30, y: 30 },
          intensity: themeDefaults.lighting3d.intensity || 0.3,
        });
      } else {
        setLighting3d({
          enabled: false,
          position: { x: 30, y: 30 },
          intensity: 0.3,
        });
      }

      // Apply drop shadow defaults
      if (themeDefaults.dropShadow !== undefined) {
        setDropShadow(themeDefaults.dropShadow);
      } else {
        setDropShadow(false);
      }
      if (themeDefaults.dropShadowOpacity !== undefined) {
        setDropShadowOpacity(themeDefaults.dropShadowOpacity);
      } else {
        setDropShadowOpacity(0.4);
      }
      if (themeDefaults.dropShadowDirection) {
        setDropShadowDirection(themeDefaults.dropShadowDirection);
      } else {
        setDropShadowDirection({ x: 0, y: 8 });
      }

      // Apply animation defaults  
      if (themeDefaults.animated !== undefined) {
        setIsAnimated(themeDefaults.animated);
      } else {
        setIsAnimated(false);
      }
      if (themeDefaults.animationType) {
        setAnimationType(themeDefaults.animationType);
      } else {
        setAnimationType('float');
      }
      if (themeDefaults.animationConfig) {
        setAnimationSpeed(themeDefaults.animationConfig.duration ? 10 / themeDefaults.animationConfig.duration : 1.0);
        setAnimationIntensity(themeDefaults.animationConfig.intensity || 1.0);
      } else {
        setAnimationSpeed(1.0);
        setAnimationIntensity(1.0);
      }

      // Apply container animation defaults - but don't override user's explicit preferences
      if (themeDefaults.containerAnimation) {
        // Only apply theme's container animation for orbs, backgrounds should stay 'none'
        if (displayMode !== 'background') {
          setContainerAnimation(themeDefaults.containerAnimation);
        }
      }
      if (themeDefaults.containerAnimationConfig) {
        setContainerAnimationSpeed(themeDefaults.containerAnimationConfig.duration ? 10 / themeDefaults.containerAnimationConfig.duration : 1.0);
      } else {
        setContainerAnimationSpeed(1.0);
      }

      onThemeSelect?.(theme);
    }
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handleResetToTheme = () => {
    if (isCustomMode) return; // Can't reset in custom mode
    
    const themeData = ALL_THEMES[selectedTheme];
    if (!themeData) return;
    
    // Reset everything to theme defaults
    setBackgroundColor(themeData.backgroundColor);
    setCustomShapes([...themeData.shapes]);
    
    // Reset behavior settings to defaults
    setIsAnimated(false);
    setAnimationType('float');
    setAnimationSpeed(1.0);
    setAnimationIntensity(1.0);
    setContainerAnimation('none');
    setContainerAnimationSpeed(1.0);
    setMouseTracking({
      enabled: false,
      mode: 'attract',
      intensity: 0.3,
      radius: 30,
    });
    // Reset visual effects to theme defaults
    if (themeData.visualEffects) {
      setVisualEffects({
        saturation: themeData.visualEffects.saturation || 1.0,
        contrast: themeData.visualEffects.contrast || 1.0,
        brightness: themeData.visualEffects.brightness || 1.0,
        hue: themeData.visualEffects.hue || 0,
      });
    } else {
      setVisualEffects({
        saturation: 1.0,
        contrast: 1.0,
        brightness: 1.0,
        hue: 0,
      });
    }

    // Reset visual enhancements to theme defaults
    if (themeData.lighting3d) {
      setLighting3d({
        enabled: themeData.lighting3d.enabled || false,
        position: themeData.lighting3d.position || { x: 30, y: 30 },
        intensity: themeData.lighting3d.intensity || 0.3,
      });
    } else {
      setLighting3d({
        enabled: false,
        position: { x: 30, y: 30 },
        intensity: 0.3,
      });
    }

    if (themeData.dropShadow) {
      setDropShadow(themeData.dropShadow.size || true);
      setDropShadowOpacity(themeData.dropShadow.opacity || 0.4);
      setDropShadowDirection(themeData.dropShadow.direction || { x: 0, y: 8 });
    } else {
      setDropShadow(false);
      setDropShadowOpacity(0.4);
      setDropShadowDirection({ x: 0, y: 8 });
    }

    // Reset animation settings to theme defaults
    if (themeData.animation) {
      setIsAnimated(themeData.animation.enabled || false);
      setAnimationType(themeData.animation.type || 'float');
      setAnimationSpeed(themeData.animation.duration ? 10 / themeData.animation.duration : 1.0);
      setAnimationIntensity(themeData.animation.intensity || 1.0);
    } else {
      setIsAnimated(false);
      setAnimationType('float');
      setAnimationSpeed(1.0);
      setAnimationIntensity(1.0);
    }

    // Reset container animation to user default (none for backgrounds)
    setContainerAnimation('none');
    setContainerAnimationSpeed(1.0);
  };

  const handleAnimationChange = (animated: boolean, type?: AnimationType, speed?: number, intensity?: number) => {
    const newAnimationType = type || animationType;
    
    setIsAnimated(animated);
    if (type) setAnimationType(type);
    if (speed !== undefined) setAnimationSpeed(speed);
    if (intensity !== undefined) setAnimationIntensity(intensity);
    
    onAnimationChange?.(animated, newAnimationType);
  };

  const handleContainerAnimationChange = (type: ContainerAnimationType, speed?: number) => {
    setContainerAnimation(type);
    if (speed !== undefined) setContainerAnimationSpeed(speed);
  };

  const handleMouseTrackingChange = (config: Partial<typeof mouseTracking>) => {
    setMouseTracking(prev => ({ ...prev, ...config }));
  };

  const handleShapesChange = (shapes: ShapeConfig[]) => {
    setCustomShapes(shapes);
    onCustomConfigChange?.(true, isCustomMode ? {
      backgroundColor: backgroundColor,
      shapes: shapes,
    } : getCurrentCustomConfig(shapes));
  };

  const handleVisualEffectsChange = (effects: typeof visualEffects) => {
    setVisualEffects(effects);
  };

  const handleDisplayModeChange = (mode: 'background' | 'orb') => {
    setDisplayMode(mode);
    
    // Auto-optimize settings for orb mode
    if (mode === 'orb') {
      setIsAnimated(true);
      setAnimationType('morph');
      setContainerAnimation('rotation');
      setContainerAnimationSpeed(0.5); // Slower rotation for orbs
    } else if (mode === 'background') {
      // Reset container animation for backgrounds (rotation doesn't make sense)
      if (containerAnimation === 'rotation' || containerAnimation === 'hue-rotation') {
        setContainerAnimation('none');
      }
    }
  };

  const handleOrbSizeChange = (size: number) => {
    setOrbSize(size);
  };

  const handleDropShadowChange = (shadow: number | boolean) => {
    setDropShadow(shadow);
  };

  const handleDropShadowOpacityChange = (opacity: number) => {
    setDropShadowOpacity(opacity);
  };

  const handleDropShadowDirectionChange = (direction: { x: number; y: number }) => {
    setDropShadowDirection(direction);
  };

  const handleLighting3dChange = (lighting: typeof lighting3d) => {
    setLighting3d(lighting);
  };

  // Check if there are customizations compared to the base theme
  const hasCustomizations = (() => {
    if (isCustomMode) return false; // Custom mode doesn't have "customizations"
    
    const baseTheme = ALL_THEMES[selectedTheme];
    if (!baseTheme) return false;
    
    // Check background color
    if (backgroundColor !== baseTheme.backgroundColor) return true;
    
    // Check shapes (simplified check - could be more sophisticated)
    if (customShapes.length !== baseTheme.shapes.length) return true;
    
    // Check if any shape has been modified
    for (let i = 0; i < customShapes.length; i++) {
      const custom = customShapes[i];
      const original = baseTheme.shapes[i];
      if (!original) return true;
      
      if (custom.width !== original.width ||
          custom.height !== original.height ||
          custom.x !== original.x ||
          custom.y !== original.y ||
          custom.blur !== original.blur ||
          custom.opacity !== original.opacity ||
          custom.gradient !== original.gradient ||
          custom.shape !== original.shape) {
        return true;
      }
    }
    
    return false;
  })();

  // Update custom config when state changes
  useEffect(() => {
    const config = isCustomMode ? {
      backgroundColor: backgroundColor,
      shapes: customShapes,
    } : hasCustomizations ? {
      ...(backgroundColor !== ALL_THEMES[selectedTheme]?.backgroundColor && { backgroundColor }),
      ...(customShapes !== ALL_THEMES[selectedTheme]?.shapes && { shapes: customShapes }),
    } : {};
    
    onCustomConfigChange?.(true, config);
  }, [backgroundColor, isCustomMode, selectedTheme, customShapes, hasCustomizations, onCustomConfigChange]);

  const getCurrentCustomConfig = (shapes?: ShapeConfig[]): Partial<BackgroundConfig> => {
    if (isCustomMode) {
      // Custom mode: return full config
      return {
        backgroundColor: backgroundColor,
        shapes: shapes || customShapes,
      };
    } else {
      // Theme mode: return only diffs
      const baseTheme = ALL_THEMES[selectedTheme];
      if (!baseTheme || !hasCustomizations) {
        return {}; // No customizations, return empty config
      }
      
      const config: Partial<BackgroundConfig> = {};
      
      // Include background color if different
      if (backgroundColor !== baseTheme.backgroundColor) {
        config.backgroundColor = backgroundColor;
      }
      
      // Include shapes if different
      const currentShapes = shapes || customShapes;
      let shapesChanged = currentShapes.length !== baseTheme.shapes.length;
      
      if (!shapesChanged) {
        for (let i = 0; i < currentShapes.length; i++) {
          const custom = currentShapes[i];
          const original = baseTheme.shapes[i];
          if (!original || 
              custom.width !== original.width ||
              custom.height !== original.height ||
              custom.x !== original.x ||
              custom.y !== original.y ||
              custom.blur !== original.blur ||
              custom.opacity !== original.opacity ||
              custom.gradient !== original.gradient ||
              custom.shape !== original.shape) {
            shapesChanged = true;
            break;
          }
        }
      }
      
      if (shapesChanged) {
        config.shapes = currentShapes;
      }
      
      return config;
    }
  };

  const getAnimationConfig = () => ({
    type: animationType,
    duration: 10 / animationSpeed, // Convert speed to duration (10s base duration)
    intensity: animationIntensity,
    easing: 'ease-in-out',
  });

  const isLightThemeSelected = isLightTheme(selectedTheme);
  const mainTextColor = isLightThemeSelected ? '#2d3436' : 'white';

  // Always use custom shapes for editing
  const getCurrentShapes = () => {
    return customShapes;
  };

  const renderPreview = () => (
    <MeshGradient 
      theme={isCustomMode ? undefined : selectedTheme} 
      animated={isAnimated}
      animationType={animationType}
      animationConfig={getAnimationConfig()}
      containerAnimation={containerAnimation}
      containerAnimationConfig={{
        type: containerAnimation,
        duration: 10 / containerAnimationSpeed,
        easing: 'linear'
      }}
      mouseTracking={mouseTracking}
      visualEffects={visualEffects}
      dropShadow={dropShadow}
      dropShadowOpacity={dropShadowOpacity}
      dropShadowDirection={dropShadowDirection}
      lighting3d={lighting3d}
      customConfig={isCustomMode ? {
        backgroundColor: backgroundColor,
        shapes: customShapes,
      } : getCurrentCustomConfig()}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '20px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            opacity: 0.8,
          }}>
            {isFullscreen ? 'CSS Mesh Gradients' : 'Preview'}
          </div>

          {isFullscreen && (
            <>
              <a
                href="https://www.npmjs.com/package/css-mesh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transform: 'translate3d(0, 0, 0)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                title="Install via NPM"
              >
                📦 NPM
              </a>
              <a
                href="https://github.com/stevesouth/css-mesh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transform: 'translate3d(0, 0, 0)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                title="View on GitHub"
              >
                ⭐ GitHub
              </a>
            </>
          )}
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: 0.8,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            title={isFullscreen ? "Exit fullscreen (ESC)" : "Enter fullscreen"}
          >
            {isFullscreen ? '↙ Exit' : '↗ Fullscreen'}
          </button>
        </div>
      </div>
    </MeshGradient>
  );

  return (
    <>
      {/* Fullscreen Preview Overlay */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          backgroundColor: '#000',
        }}>
          {renderPreview()}
        </div>
      )}

      {/* Layout Container - No fullscreen */}
      {!isFullscreen && (
        <>
          {/* Fixed Left Sidebar */}
          {showControls && (
            <Sidebar
              selectedTheme={selectedTheme}
              backgroundColor={backgroundColor}
              isCustomMode={isCustomMode}
              hasCustomizations={hasCustomizations}
              isAnimated={isAnimated}
              animationType={animationType}
              animationSpeed={animationSpeed}
              animationIntensity={animationIntensity}
              containerAnimation={containerAnimation}
              containerAnimationSpeed={containerAnimationSpeed}
              mouseTracking={mouseTracking}
              visualEffects={visualEffects}
              expandedSections={expandedSections}
              displayMode={displayMode}
              orbSize={orbSize}
              dropShadow={dropShadow}
              dropShadowOpacity={dropShadowOpacity}
              dropShadowDirection={dropShadowDirection}
              lighting3d={lighting3d}
              onThemeChange={handleThemeChange}
              onBackgroundColorChange={handleBackgroundColorChange}
              onResetToTheme={handleResetToTheme}
              onAnimationChange={handleAnimationChange}
              onContainerAnimationChange={handleContainerAnimationChange}
              onMouseTrackingChange={handleMouseTrackingChange}
              onVisualEffectsChange={handleVisualEffectsChange}
              onToggleSection={toggleSection}
              getCurrentShapes={getCurrentShapes}
              onShapesChange={handleShapesChange}
              onDisplayModeChange={handleDisplayModeChange}
              onOrbSizeChange={handleOrbSizeChange}
              onDropShadowChange={handleDropShadowChange}
              onDropShadowOpacityChange={handleDropShadowOpacityChange}
              onDropShadowDirectionChange={handleDropShadowDirectionChange}
              onLighting3dChange={handleLighting3dChange}
            />
          )}

          {/* Main Content Area with MeshGradient Background */}
          <div style={{
            marginLeft: showControls ? '320px' : '0',
            width: showControls ? 'calc(100vw - 320px)' : '100vw',
            height: '100vh',
            overflow: 'auto',
            position: 'relative',
          }}>            
            {/* Scrollable Content */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: '40px 60px',
              minHeight: '100vh', // Ensure content is at least full viewport height
            }}>
              <MeshGradient 
                theme={isCustomMode ? undefined : selectedTheme} 
                animated={isAnimated}
                animationType={animationType}
                animationConfig={getAnimationConfig()}
                containerAnimation="none"
                containerAnimationConfig={{
                  type: 'none',
                  duration: 10 / containerAnimationSpeed,
                  easing: 'linear'
                }}
                mouseTracking={mouseTracking}
                visualEffects={visualEffects}
                dropShadow={dropShadow}
                dropShadowOpacity={dropShadowOpacity}
                dropShadowDirection={dropShadowDirection}
                lighting3d={lighting3d}
                customConfig={isCustomMode ? {
                  backgroundColor: backgroundColor,
                  shapes: customShapes,
                } : getCurrentCustomConfig()}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: showControls ? '320px' : '0',
                  width: showControls ? 'calc(100vw - 320px)' : '100vw',
                  height: '100vh',
                  zIndex: -1, // Behind all content
                }}
              />
              <div style={{ 
                position: 'relative',
                textAlign: 'center', 
                marginBottom: '40px' 
              }}>
                <h1 style={{ color: mainTextColor, fontSize: '2.5rem', margin: 0 }}>
                  CSS Mesh Gradients
                </h1>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <a
                    href="https://www.npmjs.com/package/css-mesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transform: 'translate3d(0, 0, 0)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      opacity: 0.8,
                      transition: 'opacity 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                    title="Install via NPM"
                  >
                    📦 NPM
                  </a>
                  <a
                    href="https://github.com/stevesouth/css-mesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      transform: 'translate3d(0, 0, 0)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      opacity: 0.8,
                      transition: 'opacity 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                    title="View on GitHub"
                  >
                    ⭐ GitHub
                  </a>
                </div>
              </div>

              {/* Demo Preview Card */}
              {displayMode === 'orb' ? (
                <ChatPreview
                  orbProps={{
                    theme: isCustomMode ? undefined : selectedTheme,
                    animated: isAnimated,
                    animationType: animationType,
                    animationConfig: getAnimationConfig(),
                    containerAnimation: containerAnimation,
                    containerAnimationConfig: {
                      type: containerAnimation,
                      duration: 10 / containerAnimationSpeed,
                      easing: 'linear'
                    },
                    mouseTracking: mouseTracking,
                    visualEffects: visualEffects,
                    dropShadow: dropShadow,
                    dropShadowOpacity: dropShadowOpacity,
                    dropShadowDirection: dropShadowDirection,
                    lighting3d: lighting3d,
                    customConfig: isCustomMode ? {
                      backgroundColor: backgroundColor,
                      shapes: customShapes,
                    } : getCurrentCustomConfig(),
                  }}
                  orbSize={orbSize}
                />
              ) : (
                <div style={{ 
                  height: '400px', 
                  marginBottom: '40px', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}>
                  {renderPreview()}
                </div>
              )}

              {/* Dynamic Code Generator */}
              {showCodeExamples && (
                <CodeGenerator
                  selectedTheme={isCustomMode ? undefined : selectedTheme}
                  isAnimated={isAnimated}
                  animationType={animationType}
                  animationSpeed={animationSpeed}
                  animationIntensity={animationIntensity}
                  containerAnimation={'none'}
                  containerAnimationSpeed={containerAnimationSpeed}
                  mouseTracking={mouseTracking}
                  visualEffects={visualEffects}
                  showCustom={isCustomMode || hasCustomizations}
                  customConfig={isCustomMode ? {
                    backgroundColor: backgroundColor,
                    shapes: customShapes,
                  } : getCurrentCustomConfig()}
                  mainTextColor={mainTextColor}
                  showOrbMode={displayMode === 'orb'}
                  orbSize={orbSize}
                  dropShadow={dropShadow}
                  dropShadowOpacity={dropShadowOpacity}
                  dropShadowDirection={dropShadowDirection}
                  lighting3d={lighting3d}
                />
              )}

              {/* Theme Grid */}
              {showThemeGrid && (
                <ThemeGrid
                  selectedTheme={selectedTheme}
                  onThemeChange={handleThemeChange}
                  mainTextColor={mainTextColor}
                />
              )}

              {/* Features Section */}
              <FeaturesSection mainTextColor={mainTextColor} />

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                marginTop: '40px',
                padding: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <a
                  href="https://south.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: mainTextColor,
                    textDecoration: 'underline',
                    fontSize: '14px',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  made by south.dev
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MeshGradientDemo; 