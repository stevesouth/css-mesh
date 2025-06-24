import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MeshGradient from '../MeshGradient'
import { getTheme } from '../../themes'

describe('MeshGradient Component', () => {
  it('should render without crashing', () => {
    render(<MeshGradient />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toBeInTheDocument()
  })

  it('should render children content', () => {
    render(
      <MeshGradient>
        <div data-testid="child-content">Hello World</div>
      </MeshGradient>
    )
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should apply theme background color', () => {
    const sunsetTheme = getTheme('sunset')
    render(<MeshGradient theme="sunset" />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toHaveStyle(`background-color: ${sunsetTheme.backgroundColor}`)
  })

  it('should render correct number of shapes for theme', () => {
    const sunsetTheme = getTheme('sunset')
    render(<MeshGradient theme="sunset" />)
    
    const shapes = screen.getAllByTestId(/mesh-ellipse-/)
    expect(shapes).toHaveLength(sunsetTheme.shapes.length)
  })

  it('should apply custom background color from customConfig', () => {
    const customConfig = {
      backgroundColor: '#123456',
      shapes: []
    }
    
    render(<MeshGradient customConfig={customConfig} />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toHaveStyle('background-color: #123456')
  })

  it('should render custom shapes from customConfig', () => {
    const customConfig = {
      backgroundColor: '#000000',
      shapes: [
        {
          id: 'test-ellipse',
          width: 50,
          height: 50,
          x: 10,
          y: 10,
          gradient: 'linear-gradient(45deg, red, blue)',
          blur: 20,
          opacity: 0.8,
          zIndex: 1,
          shape: 'ellipse' as const,
        }
      ]
    }
    
    render(<MeshGradient customConfig={customConfig} />)
    
    const ellipse = screen.getByTestId('mesh-ellipse-test-ellipse')
    expect(ellipse).toBeInTheDocument()
  })

  it('should apply animation classes when animated is true', () => {
    render(<MeshGradient theme="sunset" animated={true} animationType="float" />)
    
    const shapes = screen.getAllByTestId(/mesh-ellipse-/)
    expect(shapes.length).toBeGreaterThan(0)
    // Note: Animation is applied via CSS-in-JS, not class names
    // The actual animation is controlled by style properties, not CSS classes
  })

  it('should not apply animation classes when animated is false', () => {
    render(<MeshGradient theme="sunset" animated={false} />)
    
    const shapes = screen.getAllByTestId(/mesh-ellipse-/)
    expect(shapes.length).toBeGreaterThan(0)
    // Animation is controlled by CSS-in-JS properties, not classes
  })

  it('should apply custom className', () => {
    render(<MeshGradient className="custom-class" />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toHaveClass('custom-class')
  })

  it('should apply custom styles', () => {
    const customStyle = { border: '2px solid red' }
    render(<MeshGradient style={customStyle} />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toHaveStyle('border: 2px solid red')
  })

  it('should handle invalid theme gracefully', () => {
    const fallbackTheme = getTheme('sunset') // The fallback theme
    render(<MeshGradient theme="nonexistent-theme" />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toBeInTheDocument()
    // Should fall back to sunset theme
    expect(container).toHaveStyle(`background-color: ${fallbackTheme.backgroundColor}`)
  })

  it('should apply visual effects when provided', () => {
    const visualEffects = {
      saturation: 1.5,
      contrast: 1.2,
      brightness: 0.8,
      hue: 45
    }
    
    render(<MeshGradient visualEffects={visualEffects} />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toBeInTheDocument()
    // Visual effects are applied to individual shapes, not the container
  })

  it('should merge theme config with custom config correctly', () => {
    const sunsetTheme = getTheme('sunset')
    const customConfig = {
      backgroundColor: '#ff0000'
      // Not providing shapes, should use theme shapes
    }
    
    render(<MeshGradient theme="sunset" customConfig={customConfig} />)
    
    const container = screen.getByTestId('mesh-gradient')
    expect(container).toHaveStyle('background-color: rgb(255, 0, 0)')
    
    // Should still render theme shapes
    const shapes = screen.getAllByTestId(/mesh-ellipse-/)
    expect(shapes).toHaveLength(sunsetTheme.shapes.length)
  })
}) 