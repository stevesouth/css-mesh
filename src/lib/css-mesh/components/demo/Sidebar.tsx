import React from 'react';
import { THEME_NAMES } from '../../themes';
import ShapeEditor from './EllipseEditor';
import type { AnimationType, ContainerAnimationType } from '../../types/animation.types';
import type { ShapeConfig } from '../../types/theme.types';
import type { MouseTrackingConfig } from '../../types/component.types';

interface SidebarProps {
  selectedTheme: string;
  backgroundColor: string;
  isCustomMode: boolean;
  hasCustomizations: boolean;
  isAnimated: boolean;
  animationType: AnimationType;
  animationSpeed: number;
  animationIntensity: number;
  containerAnimation: ContainerAnimationType;
  containerAnimationSpeed: number;
  mouseTracking: Partial<MouseTrackingConfig>;
  visualEffects: {
    saturation: number;
    contrast: number;
    brightness: number;
    hue: number;
  };
  expandedSections: {
    themes: boolean;
    animation: boolean;
    containerAnimation: boolean;
    mouseTracking: boolean;
    shapes: boolean;
    effects: boolean;
    orb: boolean;
  };
  displayMode: 'background' | 'orb';
  orbSize: number;
  onThemeChange: (theme: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onResetToTheme: () => void;
  onAnimationChange: (animated: boolean, type?: AnimationType, speed?: number, intensity?: number) => void;
  onContainerAnimationChange: (type: ContainerAnimationType, speed?: number) => void;
  onMouseTrackingChange: (config: Partial<MouseTrackingConfig>) => void;
  onVisualEffectsChange: (effects: SidebarProps['visualEffects']) => void;
  onToggleSection: (section: keyof SidebarProps['expandedSections']) => void;
  getCurrentShapes: () => ShapeConfig[];
  onShapesChange: (shapes: ShapeConfig[]) => void;
  onDisplayModeChange: (mode: 'background' | 'orb') => void;
  onOrbSizeChange: (size: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedTheme,
  backgroundColor,
  isCustomMode,
  hasCustomizations,
  isAnimated,
  animationType,
  animationSpeed,
  animationIntensity,
  containerAnimation,
  containerAnimationSpeed,
  mouseTracking,
  visualEffects,
  expandedSections,
  displayMode,
  orbSize,
  onThemeChange,
  onBackgroundColorChange,
  onResetToTheme,
  onAnimationChange,
  onContainerAnimationChange,
  onMouseTrackingChange,
  onVisualEffectsChange,
  onToggleSection,
  getCurrentShapes,
  onShapesChange,
  onDisplayModeChange,
  onOrbSizeChange,
}) => {
  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '320px',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transform: 'translate3d(0, 0, 0)', // GPU acceleration for blur performance
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderLeft: 'none',
    padding: '20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1000,
    color: 'white',
    boxSizing: 'border-box',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    userSelect: 'none',
  };

  const sectionContentStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem' }}>
        Controls
      </h2>

      {/* 1. Themes Section - Starting point */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('themes')}
        >
          <span>🎨 Themes</span>
          <span>{expandedSections.themes ? '−' : '+'}</span>
        </div>
        {expandedSections.themes && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Theme:
              </label>
              <select 
                value={selectedTheme} 
                onChange={(e) => onThemeChange(e.target.value)}
                aria-label="Select background theme"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                }}
              >
                <option value="custom" style={{ backgroundColor: '#2d1b69', color: 'white' }}>
                  Custom
                </option>
                {THEME_NAMES.map(theme => (
                  <option key={theme} value={theme} style={{ backgroundColor: '#2d1b69', color: 'white' }}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Background Color Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Background Color:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onBackgroundColorChange(e.target.value)}
                  style={{
                    width: '40px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  title="Background color"
                />
                <div style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}>
                  {backgroundColor}
                </div>
              </div>
            </div>

            {/* Reset Button - Only show when there are customizations */}
            {!isCustomMode && hasCustomizations && (
              <div style={{ marginBottom: '16px' }}>
                <button
                  onClick={onResetToTheme}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 165, 0, 0.3)',
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    color: 'orange',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                  title="Reset all customizations to theme defaults"
                >
                  🔄 Reset to {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
                </button>
              </div>
            )}

            {/* Status Indicator */}
            <div style={{ 
              fontSize: '12px',
              opacity: 0.7,
              fontStyle: 'italic',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
            }}>
              {isCustomMode ? (
                '🎨 Custom mode: Start from scratch'
              ) : hasCustomizations ? (
                `📝 Modified ${selectedTheme} theme`
              ) : (
                `✨ Pure ${selectedTheme} theme`
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Display Mode Section - Choose between background and orb */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('orb')}
        >
          <span>🔮 Display Mode</span>
          <span>{expandedSections.orb ? '−' : '+'}</span>
        </div>
        {expandedSections.orb && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '12px' }}>
                <input 
                  type="checkbox" 
                  checked={displayMode === 'orb'} 
                  onChange={(e) => onDisplayModeChange(e.target.checked ? 'orb' : 'background')}
                />
                Show as floating orb
              </label>
            </div>

            {displayMode === 'orb' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Orb Size: {orbSize}px
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    step="5"
                    value={orbSize}
                    onChange={(e) => onOrbSizeChange(Number(e.target.value))}
                    aria-label="Orb size"
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    <span>40px</span>
                    <span>150px</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4', marginBottom: '12px' }}>
                  <strong>💡 Tip:</strong> Try "morph" animation for the best orb effect!
                </div>
              </>
            )}

            <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4' }}>
              <strong>Display Modes:</strong><br/>
              • <strong>Background:</strong> Full gradient behind content<br/>
              • <strong>Orb:</strong> Floating orb in chat interface<br/>
              • Perfect for AI chatbots and voice assistants<br/>
              • All animations and effects apply to both modes
            </div>
          </div>
        )}
      </div>

      {/* 3. Shapes Section - Core content editing */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('shapes')}
        >
          <span>⚪ Shapes ({getCurrentShapes().length})</span>
          <span>{expandedSections.shapes ? '−' : '+'}</span>
        </div>
        {expandedSections.shapes && (
          <div style={sectionContentStyle}>
            <ShapeEditor
              shapes={getCurrentShapes()}
              onShapesChange={onShapesChange}
            />
          </div>
        )}
      </div>

      {/* 4. Animation Section - Add motion */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('animation')}
        >
          <span>✨ Animation</span>
          <span>{expandedSections.animation ? '−' : '+'}</span>
        </div>
        {expandedSections.animation && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '12px' }}>
                <input 
                  type="checkbox" 
                  checked={isAnimated} 
                  onChange={(e) => onAnimationChange(e.target.checked)}
                />
                Enable Animation
              </label>
            </div>

            {isAnimated && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Animation Type:
                  </label>
                  <select 
                    value={animationType} 
                    onChange={(e) => {
                      const newType = e.target.value as AnimationType;
                      onAnimationChange(isAnimated, newType, animationSpeed, animationIntensity);
                    }}
                    aria-label="Select animation type"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                    }}
                  >
                    <option value="none" style={{ backgroundColor: '#2d1b69', color: 'white' }}>None</option>
                    <option value="float" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Float</option>
                    <option value="pulse" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Pulse</option>
                    <option value="wave" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Wave</option>
                    <option value="rotation" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Rotation</option>
                    <option value="orbit" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Orbit</option>
                    <option value="morph" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Morph</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Speed: {animationSpeed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => onAnimationChange(isAnimated, animationType, Number(e.target.value), animationIntensity)}
                    aria-label="Animation speed"
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    <span>0.5x</span>
                    <span>3x</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Intensity: {Math.round(animationIntensity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={animationIntensity}
                    onChange={(e) => onAnimationChange(isAnimated, animationType, animationSpeed, Number(e.target.value))}
                    aria-label="Animation intensity"
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    <span>10%</span>
                    <span>500%</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4' }}>
                  <strong>Animation Info:</strong><br/>
                  • Float: Gentle drifting motion<br/>
                  • Pulse: Breathing scale effect<br/>
                  • Wave: Synchronized wave patterns<br/>
                  • Rotation: Slow spinning motion<br/>
                  • Orbit: Ellipses orbit around points<br/>
                  • Morph: Dynamic morphing with rotation<br/><br/>
                  <strong>Intensity:</strong> Controls animation movement amount<br/>
                  • Low: Subtle, small movements<br/>
                  • High: Dramatic, large movements
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 4. Visual Effects Section - Element-level effects */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('effects')}
        >
          <span>🎨 Visual Effects</span>
          <span>{expandedSections.effects ? '−' : '+'}</span>
        </div>
        {expandedSections.effects && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Saturation: {Math.round(visualEffects.saturation * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={visualEffects.saturation}
                onChange={(e) => onVisualEffectsChange({
                  ...visualEffects,
                  saturation: Number(e.target.value)
                })}
                aria-label="Saturation"
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                <span>0%</span>
                <span>300%</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Contrast: {Math.round(visualEffects.contrast * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={visualEffects.contrast}
                onChange={(e) => onVisualEffectsChange({
                  ...visualEffects,
                  contrast: Number(e.target.value)
                })}
                aria-label="Contrast"
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                <span>50%</span>
                <span>200%</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Brightness: {Math.round(visualEffects.brightness * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={visualEffects.brightness}
                onChange={(e) => onVisualEffectsChange({
                  ...visualEffects,
                  brightness: Number(e.target.value)
                })}
                aria-label="Brightness"
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                <span>50%</span>
                <span>200%</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Hue Shift: {Math.round(visualEffects.hue)}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={visualEffects.hue}
                onChange={(e) => onVisualEffectsChange({
                  ...visualEffects,
                  hue: Number(e.target.value)
                })}
                aria-label="Hue shift"
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                <span>0°</span>
                <span>360°</span>
              </div>
            </div>

            <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4' }}>
              <strong>Visual Effects:</strong><br/>
              • Saturation: Color intensity and vividness<br/>
              • Contrast: Light vs dark difference<br/>
              • Brightness: Overall lightness<br/>
              • Hue: Color wheel rotation
            </div>
          </div>
        )}
      </div>

      {/* 5. Container Effects Section - Container-level effects */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('containerAnimation')}
        >
          <span>🌈 Container Effects</span>
          <span>{expandedSections.containerAnimation ? '−' : '+'}</span>
        </div>
        {expandedSections.containerAnimation && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                Effect Type:
              </label>
              <select 
                value={containerAnimation} 
                onChange={(e) => {
                  const newType = e.target.value as ContainerAnimationType;
                  onContainerAnimationChange(newType, containerAnimationSpeed);
                }}
                aria-label="Select container animation type"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                <option value="none" style={{ backgroundColor: '#2d1b69', color: 'white' }}>None</option>
                <option value="hue" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Hue Shift</option>
              </select>
            </div>

            {containerAnimation !== 'none' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                  Speed: {containerAnimationSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={containerAnimationSpeed}
                  onChange={(e) => onContainerAnimationChange(containerAnimation, Number(e.target.value))}
                  aria-label="Container animation speed"
                  style={{
                    width: '100%',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                  <span>0.5x</span>
                  <span>3x</span>
                </div>
              </div>
            )}

            <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4' }}>
              <strong>Container Effects:</strong><br/>
              • Hue Shift: Cycles through rainbow colors<br/>
              • Applied to entire gradient, not individual shapes<br/>
              • Independent of ellipse animations
            </div>
          </div>
        )}
      </div>

      {/* 6. Mouse Tracking Section - Interactivity */}
      <div style={sectionStyle}>
        <div 
          style={sectionHeaderStyle}
          onClick={() => onToggleSection('mouseTracking')}
        >
          <span>🖱️ Mouse Tracking</span>
          <span>{expandedSections.mouseTracking ? '−' : '+'}</span>
        </div>
        {expandedSections.mouseTracking && (
          <div style={sectionContentStyle}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '12px' }}>
                <input 
                  type="checkbox" 
                  checked={mouseTracking.enabled || false} 
                  onChange={(e) => onMouseTrackingChange({ ...mouseTracking, enabled: e.target.checked })}
                />
                Enable Mouse Tracking
              </label>
            </div>

            {mouseTracking.enabled && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Mode:
                  </label>
                  <select 
                    value={mouseTracking.mode || 'attract'} 
                    onChange={(e) => onMouseTrackingChange({ ...mouseTracking, mode: e.target.value as 'attract' | 'repel' })}
                    aria-label="Mouse tracking mode"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <option value="attract" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Attract</option>
                    <option value="repel" style={{ backgroundColor: '#2d1b69', color: 'white' }}>Repel</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Intensity: {Math.round((mouseTracking.intensity || 0.3) * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={mouseTracking.intensity || 0.3}
                    onChange={(e) => onMouseTrackingChange({ ...mouseTracking, intensity: Number(e.target.value) })}
                    aria-label="Mouse tracking intensity"
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                    Radius: {Math.round(mouseTracking.radius || 30)}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={mouseTracking.radius || 30}
                    onChange={(e) => onMouseTrackingChange({ ...mouseTracking, radius: Number(e.target.value) })}
                    aria-label="Mouse tracking radius"
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                    <span>10%</span>
                    <span>60%</span>
                  </div>
                </div>
              </>
            )}

            <div style={{ fontSize: '12px', opacity: 0.7, lineHeight: '1.4' }}>
              <strong>Mouse Tracking:</strong><br/>
              • Attract: Ellipses move toward cursor<br/>
              • Repel: Ellipses move away from cursor<br/>
              • Intensity: Effect strength (10-100%)<br/>
              • Radius: Effect range around cursor
            </div>
          </div>
        )}
      </div>



    </div>
  );
};

export default Sidebar; 