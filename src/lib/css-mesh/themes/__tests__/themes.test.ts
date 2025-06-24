import { describe, it, expect } from 'vitest'
import { getTheme, isLightTheme, THEME_NAMES, ALL_THEMES } from '../index'

describe('Theme Utilities', () => {
  describe('getTheme', () => {
    it('should return a valid theme for existing theme names', () => {
      const theme = getTheme('sunset')
      
      expect(theme).toBeDefined()
      expect(theme).toHaveProperty('backgroundColor')
      expect(theme).toHaveProperty('shapes')
      expect(Array.isArray(theme.shapes)).toBe(true)
    })

    it('should return sunset theme for invalid theme names', () => {
      const invalidTheme = getTheme('nonexistent')
      const sunsetTheme = getTheme('sunset')
      
      expect(invalidTheme).toEqual(sunsetTheme)
    })

    it('should have all required properties for each theme', () => {
      THEME_NAMES.forEach(themeName => {
        const theme = getTheme(themeName)
        
        expect(theme).toHaveProperty('backgroundColor')
        expect(typeof theme.backgroundColor).toBe('string')
        
        expect(theme).toHaveProperty('shapes')
        expect(Array.isArray(theme.shapes)).toBe(true)
        expect(theme.shapes.length).toBeGreaterThan(0)
      })
    })
  })

  describe('isLightTheme', () => {
    it('should return true for light themes', () => {
      expect(isLightTheme('dreamy')).toBe(true)
    })

    it('should return false for dark themes', () => {
      expect(isLightTheme('sunset')).toBe(false)
      expect(isLightTheme('cosmic')).toBe(false)
      expect(isLightTheme('volcanic')).toBe(false)
    })

    it('should return false for invalid theme names', () => {
      expect(isLightTheme('nonexistent')).toBe(false)
    })
  })

  describe('THEME_NAMES', () => {
    it('should contain core theme names', () => {
      const coreThemes = [
        'sunset', 'ocean', 'aurora', 'cosmic', 'electric', 'dreamy', 'forest',
        'volcanic', 'neon'
      ]
      
      coreThemes.forEach(theme => {
        expect(THEME_NAMES).toContain(theme)
      })
    })

    it('should have 34 themes total', () => {
      expect(THEME_NAMES).toHaveLength(34)
    })
  })

  describe('ALL_THEMES', () => {
    it('should contain all themes as objects', () => {
      THEME_NAMES.forEach(themeName => {
        expect(ALL_THEMES).toHaveProperty(themeName)
        expect(ALL_THEMES[themeName]).toBeDefined()
      })
    })

    it('should have consistent ellipse structure', () => {
      // Test all themes for structural consistency
      Object.values(ALL_THEMES).forEach(theme => {
        theme.shapes.forEach(ellipse => {
          // Test required properties exist
          expect(ellipse).toHaveProperty('id')
          expect(ellipse).toHaveProperty('width')
          expect(ellipse).toHaveProperty('height')
          expect(ellipse).toHaveProperty('gradient')
          
          // Test basic type validation
          expect(typeof ellipse.id).toBe('string')
          expect(typeof ellipse.width).toBe('number')
          expect(typeof ellipse.height).toBe('number')
          expect(typeof ellipse.gradient).toBe('string')
          
          // Shape property is optional (defaults to 'ellipse')
          if (ellipse.shape) {
            expect(['ellipse', 'rectangle']).toContain(ellipse.shape)
          }
        })
      })
    })
  })
}) 