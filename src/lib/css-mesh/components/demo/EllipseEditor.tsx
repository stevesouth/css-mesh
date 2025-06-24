import React from 'react';
import type { ShapeConfig, ShapeType } from '../../types/theme.types';
import { getShapeDisplayName } from '../../utils/shape-generator';

interface ShapeEditorProps {
  shapes: ShapeConfig[];
  onShapesChange: (shapes: ShapeConfig[]) => void;
}

const ShapeEditor: React.FC<ShapeEditorProps> = ({
  shapes,
  onShapesChange,
}) => {
  const updateShape = (index: number, updates: Partial<ShapeConfig>) => {
    const newShapes = shapes.map((shape, i) => 
      i === index ? { ...shape, ...updates } : shape
    );
    onShapesChange(newShapes);
  };

  const removeShape = (index: number) => {
    const newShapes = shapes.filter((_, i) => i !== index);
    onShapesChange(newShapes);
  };

  const addShape = () => {
    const newShape: ShapeConfig = {
      id: `shape-${Date.now()}`,
      width: 60,
      height: 40,
      x: Math.random() * 60 + 20, // 20-80%
      y: Math.random() * 60 + 20, // 20-80%
      gradient: 'radial-gradient(ellipse, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
      blur: 18,
      opacity: 0.7,
      zIndex: shapes.length + 1,
      shape: 'ellipse', // Default shape type
    };
    onShapesChange([...shapes, newShape]);
  };

  const duplicateShape = (index: number) => {
    const shape = shapes[index];
    const newShape: ShapeConfig = {
      ...shape,
      id: `shape-${Date.now()}`,
      x: (shape.x + 10) % 90, // Offset position slightly
      y: (shape.y + 10) % 90,
      zIndex: shapes.length + 1,
    };
    onShapesChange([...shapes, newShape]);
  };

  const createSolidGradient = (color: string) => {
    return `radial-gradient(ellipse, ${color} 0%, ${color} 100%)`;
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    background: 'rgba(255, 255, 255, 0.2)',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  const shapeCardStyle: React.CSSProperties = {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const controlRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
    minWidth: '0', // Allow flex items to shrink
  };

  const labelStyle: React.CSSProperties = {
    minWidth: '85px', // Fixed width to prevent overflow with 3-digit numbers
    flexShrink: 0,
  };

  const buttonStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
    marginLeft: '4px',
  };

  const gradientPresets = [
    // Vibrant multi-color gradients
    'radial-gradient(ellipse, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
    'radial-gradient(ellipse, #06ffa5 0%, #ffbe0b 50%, #fb5607 100%)',
    'radial-gradient(ellipse, #f72585 0%, #7209b7 100%)',
    'radial-gradient(ellipse, #43aa8b 0%, #90e0ef 100%)',
    'radial-gradient(ellipse, #f9844a 0%, #ee6c4d 50%, #e63946 100%)',
    'radial-gradient(ellipse, #264653 0%, #2a9d8f 50%, #e9c46a 100%)',
    
    // Linear gradients for variety
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    
    // Sunset/sunrise themes
    'radial-gradient(ellipse, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    'radial-gradient(ellipse, #ff6b6b 0%, #ffa726 50%, #ffcc02 100%)',
    'radial-gradient(ellipse, #ee9ca7 0%, #ffdde1 100%)',
    'linear-gradient(45deg, #ff9a9e 0%, #ff6b6b 50%, #ffa726 100%)',
    
    // Ocean/water themes
    'radial-gradient(ellipse, #209cff 0%, #68e0cf 100%)',
    'linear-gradient(135deg, #667eea 0%, #209cff 100%)',
    'radial-gradient(ellipse, #4facfe 0%, #00f2fe 50%, #209cff 100%)',
    
    // Purple/cosmic themes
    'radial-gradient(ellipse, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    'linear-gradient(45deg, #8360c3 0%, #2ebf91 100%)',
    'radial-gradient(ellipse, #667eea 0%, #f093fb 100%)',
    
    // Warm/fire themes
    'radial-gradient(ellipse, #ff416c 0%, #ff4b2b 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #ff416c 50%, #ff4b2b 100%)',
  ];

  const solidColorPresets = [
    '#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607',
    '#f72585', '#7209b7', '#43aa8b', '#90e0ef', '#f9844a', '#ee6c4d',
    '#e63946', '#264653', '#2a9d8f', '#e9c46a', '#ff5733', '#c70039',
    '#900c3f', '#581845', '#ffc300', '#ff5733', '#c70039', '#900c3f'
  ];

  const shapeOptions: ShapeType[] = ['ellipse', 'rectangle'];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px' 
      }}>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {shapes.length} Shape{shapes.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={addShape}
          style={{
            ...buttonStyle,
            backgroundColor: 'rgba(74, 185, 255, 0.2)',
            border: '1px solid rgba(74, 185, 255, 0.3)',
            padding: '8px 14px',
            fontSize: '13px',
          }}
        >
          + Add Shape
        </button>
      </div>

      {shapes.map((shape, index) => (
        <div key={shape.id} style={shapeCardStyle}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px' 
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
              Shape {index + 1}
            </span>
            <div>
              <button
                onClick={() => duplicateShape(index)}
                style={buttonStyle}
                title="Duplicate"
              >
                📋
              </button>
              {shapes.length > 1 && (
                <button
                  onClick={() => removeShape(index)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    border: '1px solid rgba(231, 76, 60, 0.3)',
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          {/* Shape Type Selector */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', marginBottom: '6px', opacity: 0.8 }}>
              Shape Type:
            </div>
            <select 
              value={shape.shape || 'ellipse'} 
              onChange={(e) => updateShape(index, { shape: e.target.value as ShapeType })}
              aria-label={`Shape ${index + 1} type`}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontSize: '14px',
              }}
            >
              {shapeOptions.map(shapeType => (
                <option key={shapeType} value={shapeType} style={{ backgroundColor: '#2d1b69', color: 'white' }}>
                  {getShapeDisplayName(shapeType)}
                </option>
              ))}
            </select>
          </div>

          {/* Current Gradient Preview */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', marginBottom: '6px', opacity: 0.8 }}>
              Current Gradient:
            </div>
            <div style={{
              width: '100%',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: shape.gradient,
              marginBottom: '4px',
            }} />
            <div style={{
              fontSize: '11px',
              opacity: 0.6,
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              lineHeight: '1.3',
            }}>
              {shape.gradient}
            </div>
          </div>

          {/* Size Controls */}
          <div style={controlRowStyle}>
            <span style={labelStyle}>Width: {Math.round(shape.width)}%</span>
            <input
              type="range"
              min="20"
              max="150"
              value={shape.width}
              onChange={(e) => updateShape(index, { width: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} width`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          <div style={controlRowStyle}>
            <span style={labelStyle}>Height: {Math.round(shape.height)}%</span>
            <input
              type="range"
              min="10"
              max="150"
              value={shape.height}
              onChange={(e) => updateShape(index, { height: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} height`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          {/* Position Controls */}
          <div style={controlRowStyle}>
            <span style={labelStyle}>X: {Math.round(shape.x)}%</span>
            <input
              type="range"
              min="-20"
              max="120"
              value={shape.x}
              onChange={(e) => updateShape(index, { x: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} X position`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          <div style={controlRowStyle}>
            <span style={labelStyle}>Y: {Math.round(shape.y)}%</span>
            <input
              type="range"
              min="-20"
              max="120"
              value={shape.y}
              onChange={(e) => updateShape(index, { y: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} Y position`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          {/* Rectangle Border Radius Control */}
          {shape.shape === 'rectangle' && (
            <div style={controlRowStyle}>
              <span style={labelStyle}>Radius: {Math.round(Number(shape.shapeProps?.borderRadius) || 0)}px</span>
              <input
                type="range"
                min="0"
                max="50"
                value={Number(shape.shapeProps?.borderRadius) || 0}
                onChange={(e) => updateShape(index, { 
                  shapeProps: { ...shape.shapeProps, borderRadius: `${e.target.value}px` } 
                })}
                aria-label={`Shape ${index + 1} border radius`}
                style={{ ...sliderStyle, width: '60%' }}
              />
            </div>
          )}

          {/* Effect Controls */}
          <div style={controlRowStyle}>
            <span style={labelStyle}>Blur: {Math.round(shape.blur)}%</span>
            <input
              type="range"
              min="5"
              max="80"
              value={shape.blur}
              onChange={(e) => updateShape(index, { blur: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} blur amount`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          <div style={controlRowStyle}>
            <span style={labelStyle}>Opacity: {Math.round((shape.opacity || 1) * 100)}%</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={shape.opacity || 1}
              onChange={(e) => updateShape(index, { opacity: Number(e.target.value) })}
              aria-label={`Shape ${index + 1} opacity`}
              style={{ ...sliderStyle, width: '60%' }}
            />
          </div>

          {/* Color Picker Section */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '13px', marginBottom: '6px', opacity: 0.8 }}>
              Quick Colors:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              {solidColorPresets.map((color, colorIndex) => (
                <button
                  key={colorIndex}
                  onClick={() => updateShape(index, { gradient: createSolidGradient(color) })}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: color,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  title={`Color ${color}`}
                />
              ))}
            </div>
            
            {/* Native Color Picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', opacity: 0.8 }}>Custom Color:</span>
              <input
                type="color"
                onChange={(e) => updateShape(index, { gradient: createSolidGradient(e.target.value) })}
                style={{
                  width: '32px',
                  height: '24px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
                title="Pick custom color"
              />
            </div>
          </div>

          {/* Gradient Presets */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '13px', marginBottom: '6px', opacity: 0.8 }}>
              Gradient Presets:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {gradientPresets.map((gradient, presetIndex) => (
                <button
                  key={presetIndex}
                  onClick={() => updateShape(index, { gradient })}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '4px',
                    border: shape.gradient === gradient ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
                    background: gradient,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  title={`Preset ${presetIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Custom Gradient Input */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '13px', marginBottom: '4px', opacity: 0.8 }}>
              Custom Gradient:
            </div>
            <input
              type="text"
              value={shape.gradient}
              onChange={(e) => updateShape(index, { gradient: e.target.value })}
              style={{
                width: '100%',
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
              placeholder="radial-gradient(ellipse, ...)"
            />
          </div>
        </div>
      ))}

      <div style={{ 
        fontSize: '13px',
        opacity: 0.6, 
        fontStyle: 'italic',
        marginTop: '12px',
        padding: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px',
      }}>
        💡 Changes update in real-time. Use negative positions to create off-screen effects.
      </div>
    </div>
  );
};

export default ShapeEditor; 