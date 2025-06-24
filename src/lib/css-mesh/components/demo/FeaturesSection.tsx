import React from 'react';
import { THEME_NAMES } from '../../themes';

interface FeaturesSectionProps {
  mainTextColor: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  mainTextColor,
}) => {
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

  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: '16px', color: mainTextColor }}>🚀 Core Features</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div>
          <h4 style={{ color: '#74b9ff', marginBottom: '12px' }}>🎨 Smart Theme System</h4>
          <ul style={{ paddingLeft: '20px', opacity: 0.9, color: mainTextColor, lineHeight: '1.6' }}>
            <li>Smart diff-based configurations</li>
            <li>Background color picker</li>
            <li>Reset to theme functionality</li>
            <li>{THEME_NAMES.length} themes + custom mode</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fd79a8', marginBottom: '12px' }}>✨ Advanced Animations</h4>
          <ul style={{ paddingLeft: '20px', opacity: 0.9, color: mainTextColor, lineHeight: '1.6' }}>
            <li>7 animation types with controls</li>
            <li>Mouse tracking (attract/repel)</li>
            <li>Speed & intensity adjustment</li>
            <li>Performance optimized</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#26de81', marginBottom: '12px' }}>⚙️ CSS-Based Architecture</h4>
          <ul style={{ paddingLeft: '20px', opacity: 0.9, color: mainTextColor, lineHeight: '1.6' }}>
            <li>No WebGL or shaders required</li>
            <li>Lightweight bundle size</li>
            <li>Cross-browser optimized</li>
            <li>Pure CSS blur effects</li>
          </ul>
        </div>
      </div>
      
  
      <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h3 style={{ marginBottom: '16px', color: mainTextColor }}>🌐 What is CSS Mesh?</h3>
        <div style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.9, color: mainTextColor }}>
          <p style={{ marginBottom: '16px' }}>
            CSS Mesh is a lightweight React library for creating stunning mesh gradient backgrounds using pure CSS. 
            Our CSS-based approach provides beautiful animated backgrounds that work seamlessly across all browsers 
            and devices with reliable performance.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Perfect for modern web applications, CSS mesh gradients offer the visual appeal of complex gradient meshes 
            without the performance overhead. Our library includes 20 professionally designed themes, 6 animation types, 
            and extensive customization options - all powered by CSS blur effects and transforms.
          </p>
          <p style={{ marginBottom: '0' }}>
            Whether you're building landing pages, dashboards, or interactive applications, CSS mesh gradients provide 
            the perfect backdrop. Easy to implement, performant by design, and endlessly customizable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 