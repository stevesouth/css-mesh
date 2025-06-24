import React, { useState, useEffect } from 'react';
import type { AnimationType, ContainerAnimationType } from '../../types/animation.types';
import type { BackgroundConfig } from '../../types/theme.types';

interface CodeGeneratorProps {
  selectedTheme?: string;
  isAnimated: boolean;
  animationType: AnimationType;
  animationSpeed: number;
  animationIntensity: number;
  containerAnimation: ContainerAnimationType;
  containerAnimationSpeed: number;
  mouseTracking: {
    enabled: boolean;
    mode: 'attract' | 'repel';
    intensity: number;
    radius: number;
  };
  visualEffects: {
    saturation: number;
    contrast: number;
    brightness: number;
    hue: number;
  };
  showCustom: boolean;
  customConfig?: Partial<BackgroundConfig>;
  mainTextColor: string;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  selectedTheme,
  isAnimated,
  animationType,
  animationSpeed,
  animationIntensity,
  containerAnimation,
  containerAnimationSpeed,
  mouseTracking,
  visualEffects,
  showCustom,
  customConfig,
  mainTextColor,
}) => {
  const [generatedCode, setGeneratedCode] = useState('');
  
  const generateCode = () => {
    const animationConfig = {
      type: animationType,
      duration: 10 / animationSpeed,
      intensity: animationIntensity,
      easing: 'ease-in-out',
    };

    const containerAnimationConfig = {
      type: containerAnimation,
      duration: 10 / containerAnimationSpeed,
      easing: 'linear',
    };

    // Check if visual effects are non-default
    const hasVisualEffects = visualEffects.saturation !== 1 || 
                            visualEffects.contrast !== 1 || 
                            visualEffects.brightness !== 1 || 
                            visualEffects.hue !== 0;

    const hasContainerAnimation = containerAnimation !== 'none';
    const hasMouseTracking = mouseTracking.enabled;

    if (showCustom && customConfig) {
      const codeConfig = {
        ...customConfig,
        ...(isAnimated && { animationConfig })
      };

      const additionalConfigs = [];
      if (isAnimated) {
        additionalConfigs.push(`const animationConfig = ${JSON.stringify(animationConfig, null, 2)};`);
      }
      if (hasContainerAnimation) {
        additionalConfigs.push(`const containerAnimationConfig = ${JSON.stringify(containerAnimationConfig, null, 2)};`);
      }
      if (hasMouseTracking) {
        additionalConfigs.push(`const mouseTrackingConfig = ${JSON.stringify(mouseTracking, null, 2)};`);
      }
      if (hasVisualEffects) {
        additionalConfigs.push(`const visualEffects = ${JSON.stringify(visualEffects, null, 2)};`);
      }

      const propsArray = [];
      if (selectedTheme) propsArray.push(`theme="${selectedTheme}"`);
      if (isAnimated) {
        propsArray.push(`animated={true}`);
        if (animationType !== 'float') propsArray.push(`animationType="${animationType}"`);
        propsArray.push(`animationConfig={animationConfig}`);
      }
      if (hasContainerAnimation) {
        propsArray.push(`containerAnimation="${containerAnimation}"`);
        propsArray.push(`containerAnimationConfig={containerAnimationConfig}`);
      }
      if (hasMouseTracking) {
        propsArray.push(`mouseTracking={mouseTrackingConfig}`);
      }
      if (hasVisualEffects) {
        propsArray.push(`visualEffects={visualEffects}`);
      }
      propsArray.push(`customConfig={customConfig}`);

      return `// ${selectedTheme ? 'Customized Theme' : 'Custom Configuration'}
import { MeshGradient } from 'css-mesh';

const customConfig = ${JSON.stringify(codeConfig, null, 2)};${additionalConfigs.length > 0 ? '\n' + additionalConfigs.join('\n') : ''}

<MeshGradient
  ${propsArray.join('\n  ')}
>
  <YourContent />
</MeshGradient>`;
    } else {
      // Basic usage without customConfig
      const basicProps = [];
      
      if (selectedTheme) {
        basicProps.push(`theme="${selectedTheme}"`);
      }
      
      if (isAnimated) {
        basicProps.push(`animated={true}`);
        if (animationType !== 'float') {
          basicProps.push(`animationType="${animationType}"`);
        }
        // Only include animationConfig if values are not defaults
        if (animationSpeed !== 1.0 || animationIntensity !== 1.0) {
          basicProps.push(`animationConfig={{
    duration: ${(10 / animationSpeed).toFixed(1)},
    intensity: ${animationIntensity}
  }}`);
        }
      }

      // Add container animation if not none
      if (hasContainerAnimation) {
        basicProps.push(`containerAnimation="${containerAnimation}"`);
        if (containerAnimationSpeed !== 1.0) {
          basicProps.push(`containerAnimationConfig={{
    duration: ${(10 / containerAnimationSpeed).toFixed(1)},
    easing: 'linear'
  }}`);
        }
      }

      // Add mouse tracking if enabled
      if (hasMouseTracking) {
        basicProps.push(`mouseTracking={{
    enabled: ${mouseTracking.enabled},
    mode: '${mouseTracking.mode}',
    intensity: ${mouseTracking.intensity},
    radius: ${mouseTracking.radius}
  }}`);
      }

      // Add visual effects if non-default
      if (hasVisualEffects) {
        basicProps.push(`visualEffects={{
    saturation: ${visualEffects.saturation},
    contrast: ${visualEffects.contrast},
    brightness: ${visualEffects.brightness},
    hue: ${visualEffects.hue}
  }}`);
      }

      // Only show <MeshGradient> if we have props, otherwise show minimal version
      if (basicProps.length === 0) {
        return `// Minimal Usage
import { MeshGradient } from 'css-mesh';

<MeshGradient>
  <YourContent />
</MeshGradient>`;
      }

      // If only theme prop, keep it simple
      if (basicProps.length === 1 && basicProps[0].startsWith('theme=')) {
        return `// Theme Usage
import { MeshGradient } from 'css-mesh';

<MeshGradient theme="${selectedTheme}">
  <YourContent />
</MeshGradient>`;
      }

      return `// Basic Usage
import { MeshGradient } from 'css-mesh';

<MeshGradient
  ${basicProps.join('\n  ')}
>
  <YourContent />
</MeshGradient>`;
    }
  };

  useEffect(() => {
    setGeneratedCode(generateCode());
  }, [selectedTheme, isAnimated, animationType, animationSpeed, animationIntensity, containerAnimation, containerAnimationSpeed, mouseTracking, visualEffects, showCustom, customConfig]);

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    margin: '20px',
    color: mainTextColor,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  const codeStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '16px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    overflow: 'auto',
    color: '#f8f9fa',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    resize: 'vertical',
    minHeight: '200px',
    width: '100%',
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      // Could add a toast notification here in the future
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.warn('Copy to clipboard failed:', err);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px' 
      }}>
        <h3 style={{ margin: 0, color: mainTextColor }}>
          📋 Generated Code
        </h3>
        <button
          onClick={copyToClipboard}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: 'rgba(74, 185, 255, 0.2)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            border: '1px solid rgba(74, 185, 255, 0.3)',
          }}
        >
          📋 Copy to Clipboard
        </button>
      </div>
      
      <div style={{ marginBottom: '12px', fontSize: '14px', opacity: 0.8, color: mainTextColor }}>
        <strong>{showCustom ? 'Custom' : selectedTheme || 'Default'}</strong> configuration
        {isAnimated && <span> • {animationType} animation</span>}
      </div>
      
      <textarea
        value={generatedCode}
        readOnly
        style={{
          ...codeStyle,
          cursor: 'text',
          userSelect: 'all',
        }}
        placeholder="Generated code for current settings..."
        spellCheck={false}
        onClick={(e) => e.currentTarget.select()} // Select all on click for easy copying
      />
      
      <div style={{ 
        marginTop: '12px', 
        fontSize: '12px', 
        opacity: 0.6, 
        fontStyle: 'italic',
        color: mainTextColor 
      }}>
        💡 Code updates automatically as you change settings. Click to select all, or use the Copy button above.
      </div>
    </div>
  );
};

export default CodeGenerator; 