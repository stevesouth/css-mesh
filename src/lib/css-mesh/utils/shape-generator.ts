import type { ShapeType, ShapeProperties } from '../types/theme.types';

// Generate CSS styles for different shape types
export const generateShapeStyles = (
  shape: ShapeType = 'ellipse',
  shapeProps: ShapeProperties = {}
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    willChange: 'transform, filter',
    backfaceVisibility: 'hidden',
  };

  // All supported shapes use border-radius and work perfectly with filter: blur()
  switch (shape) {
    case 'ellipse':
      return {
        ...baseStyles,
        borderRadius: '50%',
      };

    case 'rectangle':
      return {
        ...baseStyles,
        borderRadius: shapeProps.borderRadius || '0',
      };

    default:
      return {
        ...baseStyles,
        borderRadius: '50%',
      };
  }
};

// Utility to generate random shape properties
export const generateRandomShapeProps = (shapeType: ShapeType): ShapeProperties => {
  switch (shapeType) {
    case 'rectangle':
      return {
        borderRadius: Math.random() < 0.5 ? `${8 + Math.random() * 24}px` : `${10 + Math.random() * 40}%`,
      };
      
    default:
      return {};
  }
};

// Utility to get shape display name
export const getShapeDisplayName = (shapeType: ShapeType): string => {
  const names: Record<ShapeType, string> = {
    ellipse: 'Ellipse',
    rectangle: 'Rectangle',
  };
  
  return names[shapeType] || 'Unknown';
}; 