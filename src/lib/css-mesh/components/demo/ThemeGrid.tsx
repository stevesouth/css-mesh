import React from 'react';
import MeshGradient from '../MeshGradient';
import { THEME_NAMES, ALL_THEMES, isLightTheme, isOrbTheme } from '../../themes';

interface ThemeGridProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  mainTextColor: string;
}

// Organized theme groups
const THEME_GROUPS = {
  base: {
    title: 'Base Themes',
    description: 'Classic gradient backgrounds perfect for any application',
    themes: ['sunset', 'ocean', 'aurora', 'cosmic', 'forest', 'monochrome', 'minimal', 'spring', 'sky', 'cream', 'dawn', 'pearl', 'blush']
  },
  orb: {
    title: 'Orb Themes',
    description: 'High-contrast themes optimized for floating orb mode - perfect for AI assistants',
    themes: ['cyberpunk', 'voidPulse', 'fireCore', 'deepSpace', 'shadowGlow', 'sunsetGlow', 'twilightDark', 'midnightGlow', 'crystalBlue', 'sunbeam', 'roseDawn', 'mintFresh', 'lavenderMist', 'dawnLight']
  },
  dramatic: {
    title: 'Dramatic Themes',
    description: 'Bold, intense gradients with enhanced visual effects',
    themes: ['volcanic', 'electric', 'neon', 'dreamy']
  },
  special: {
    title: 'Special Themes',
    description: 'Unique themes with custom features and shapes',
    themes: ['shapes', 'lavender', 'mint']
  }
};

const ThemeGrid: React.FC<ThemeGridProps> = ({
  selectedTheme,
  onThemeChange,
  mainTextColor,
}) => {
  const getTextColorForTheme = (theme: string) => {
    return isLightTheme(theme) ? '#2d3436' : 'white';
  };

  const demoCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '24px',
    margin: 0,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    height: '100%',
    minHeight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '0.9rem',
  };

  const renderThemeCard = (themeName: string) => (
    <div 
      key={themeName} 
      style={{ 
        height: '200px', 
        borderRadius: '12px', 
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        border: selectedTheme === themeName ? '3px solid #fff' : '1px solid rgba(255,255,255,0.1)',
      }}
      onClick={() => onThemeChange(themeName)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MeshGradient theme={themeName}>
        <div style={{
          ...demoCardStyle,
          color: getTextColorForTheme(themeName),
        }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: getTextColorForTheme(themeName) }}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </h3>
          {isOrbTheme(themeName) && (
            <div style={{ 
              fontSize: '0.75rem', 
              fontWeight: 'bold', 
              color: '#00ff88', 
              marginBottom: '6px',
              textShadow: '0 0 8px rgba(0, 255, 136, 0.3)'
            }}>
              🔮 ORB OPTIMISED
            </div>
          )}
          <p style={{ opacity: 0.8, fontSize: '0.9rem', color: getTextColorForTheme(themeName) }}>
            {ALL_THEMES[themeName]?.shapes.length || 0} ellipse{(ALL_THEMES[themeName]?.shapes.length || 0) > 1 ? 's' : ''}
          </p>
          {selectedTheme === themeName && (
            <p style={{ fontSize: '0.8rem', marginTop: '8px', fontWeight: 'bold', color: getTextColorForTheme(themeName) }}>
              ← Page Background
            </p>
          )}
        </div>
      </MeshGradient>
    </div>
  );

  return (
    <>
      <h2 style={{ color: mainTextColor, textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
        All {THEME_NAMES.length} Available Themes
      </h2>
      
      {Object.entries(THEME_GROUPS).map(([groupKey, group]) => (
        <div key={groupKey} style={{ marginBottom: '50px' }}>
          {/* Group Header */}
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h3 style={{ 
              color: mainTextColor, 
              fontSize: '1.5rem', 
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              {group.title} ({group.themes.length})
            </h3>
            <p style={{ 
              color: mainTextColor, 
              opacity: 0.7, 
              fontSize: '1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              {group.description}
            </p>
          </div>
          
          {/* Theme Grid for this group */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            {group.themes
              .filter(themeName => ALL_THEMES[themeName]) // Ensure theme exists
              .map(themeName => renderThemeCard(themeName))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ThemeGrid; 