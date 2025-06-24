import { describe, it, expect } from 'vitest';
import { resolveConfig, getThemeDefaults } from '../config-resolver';
import type { MeshGradientProps } from '../../types/component.types';
import type { ThemePack } from '../../types/theme.types';

describe('config-resolver', () => {
  const mockTheme: ThemePack = {
    backgroundColor: '#123456',
    shapes: [
      {
        id: 'test-shape',
        width: 50,
        height: 40,
        x: 10,
        y: 20,
        gradient: 'linear-gradient(45deg, red, blue)',
        blur: 15,
        opacity: 0.8,
        zIndex: 1
      }
    ],
    animation: {
      enabled: true,
      type: 'rotation',
      duration: 8,
      intensity: 1.5,
      easing: 'ease-out'
    },
    containerAnimation: {
      enabled: true,
      type: 'rotation',
      duration: 12,
      easing: 'ease-in-out'
    },
    visualEffects: {
      saturation: 1.2,
      contrast: 1.1,
      brightness: 0.9,
      hue: 30
    },
    dropShadow: {
      enabled: true,
      size: 25,
      opacity: 0.6,
      direction: { x: 5, y: 10 }
    },
    lighting3d: {
      enabled: true,
      position: { x: 40, y: 60 },
      intensity: 0.8
    }
  };

  describe('resolveConfig', () => {
    it('should return defaults when no theme is provided', () => {
      const props: MeshGradientProps = {};
      const result = resolveConfig(props);

      expect(result.animationType).toBe('float');
      expect(result.containerAnimation).toBe('none');
      expect(result.mouseTracking.enabled).toBe(false);
      expect(result.visualEffects.saturation).toBe(1.0);
      expect(result.lighting3d.enabled).toBe(false);
      expect(result.lighting3d.position).toEqual({ x: 30, y: 30 });
      expect(result.lighting3d.intensity).toBe(0.3);
      expect(result.size).toBe(80);
      expect(result.dropShadowOpacity).toBe(0.4);
      expect(result.dropShadowDirection).toEqual({ x: 0, y: 8 });
    });

    it('should merge theme values with defaults correctly', () => {
      const props: MeshGradientProps = {
        shape: 'orb' // Explicitly set to orb so container animation can inherit from theme
      };
      const result = resolveConfig(props, mockTheme);

      expect(result.finalConfig.backgroundColor).toBe('#123456');
      expect(result.finalConfig.shapes).toBe(mockTheme.shapes);
      expect(result.animated).toBe(true);
      expect(result.animationType).toBe('rotation');
      expect(result.animationConfig.duration).toBe(8);
      expect(result.animationConfig.intensity).toBe(1.5);
      expect(result.containerAnimation).toBe('rotation');
      expect(result.visualEffects.saturation).toBe(1.2);
      expect(result.lighting3d.enabled).toBe(true);
      expect(result.lighting3d.position).toEqual({ x: 40, y: 60 });
      expect(result.lighting3d.intensity).toBe(0.8);
    });

    it('should prioritize explicit props over theme values', () => {
      const props: MeshGradientProps = {
        animated: false,
        animationType: 'pulse',
        containerAnimation: 'none',
        visualEffects: {
          saturation: 2.0,
          contrast: 0.5,
          brightness: 1.0,
          hue: 0
        },
        lighting3d: {
          enabled: false,
          intensity: 0.1
        }
      };
      const result = resolveConfig(props, mockTheme);

      expect(result.animated).toBe(false);
      expect(result.animationType).toBe('pulse');
      expect(result.containerAnimation).toBe('none');
      expect(result.visualEffects.saturation).toBe(2.0);
      expect(result.visualEffects.contrast).toBe(0.5);
      expect(result.visualEffects.brightness).toBe(1.0); // From props
      expect(result.lighting3d.enabled).toBe(false);
      expect(result.lighting3d.intensity).toBe(0.1);
      expect(result.lighting3d.position).toEqual({ x: 40, y: 60 }); // From theme
    });

    it('should handle customConfig merging correctly', () => {
      const props: MeshGradientProps = {
        customConfig: {
          backgroundColor: '#custom-bg',
          shapes: [
            {
              id: 'custom-shape',
              width: 60,
              height: 50,
              x: 30,
              y: 40,
              gradient: 'radial-gradient(circle, green, yellow)',
              blur: 10,
              opacity: 0.9,
              zIndex: 2
            }
          ]
        }
      };
      const result = resolveConfig(props, mockTheme);

      expect(result.finalConfig.backgroundColor).toBe('#custom-bg');
      expect(result.finalConfig.shapes).toBe(props.customConfig!.shapes);
    });

    describe('Container Animation Resolution (Bug Fixes)', () => {
      it('should force containerAnimation to "none" for background shape', () => {
        const props: MeshGradientProps = {
          shape: 'background'
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.containerAnimation).toBe('none');
      });

      it('should force containerAnimation to "none" when shape is undefined (defaults to background)', () => {
        const props: MeshGradientProps = {};
        const result = resolveConfig(props, mockTheme);

        expect(result.containerAnimation).toBe('none');
      });

      it('should allow containerAnimation from theme for orb shape', () => {
        const props: MeshGradientProps = {
          shape: 'orb'
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.containerAnimation).toBe('rotation');
      });

              it('should respect explicit containerAnimation prop even for orb', () => {
          const props: MeshGradientProps = {
            shape: 'orb',
            containerAnimation: 'hue'
          };
          const result = resolveConfig(props, mockTheme);
  
          expect(result.containerAnimation).toBe('hue');
        });
    });

    describe('Nested Object Merging (Bug Fixes)', () => {
      it('should ensure lighting3d.position is always defined', () => {
        const props: MeshGradientProps = {
          lighting3d: {
            enabled: true
            // No position provided
          }
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.lighting3d.position).toBeDefined();
        expect(result.lighting3d.position.x).toBe(40); // From theme
        expect(result.lighting3d.position.y).toBe(60); // From theme
        expect(result.lighting3d.intensity).toBeDefined();
        expect(result.lighting3d.intensity).toBe(0.8); // From theme
      });

      it('should ensure lighting3d.intensity is always defined', () => {
        const props: MeshGradientProps = {
          lighting3d: {
            enabled: true,
            position: { x: 50, y: 70 }
            // No intensity provided
          }
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.lighting3d.intensity).toBeDefined();
        expect(result.lighting3d.intensity).toBe(0.8); // From theme
        expect(result.lighting3d.position.x).toBe(50); // From props
        expect(result.lighting3d.position.y).toBe(70); // From props
      });

              it('should handle partial lighting3d objects correctly', () => {
          const props: MeshGradientProps = {
            lighting3d: {
              enabled: true,
              intensity: 0.5
              // No position
            }
          };
          const result = resolveConfig(props, mockTheme);
  
          expect(result.lighting3d.enabled).toBe(true); // From props
          expect(result.lighting3d.position).toEqual({ x: 40, y: 60 }); // From theme
          expect(result.lighting3d.intensity).toBe(0.5); // From props
        });

      it('should ensure all required properties are defined when no theme lighting3d', () => {
        const themeWithoutLighting: ThemePack = {
          ...mockTheme,
          lighting3d: undefined
        };
        const props: MeshGradientProps = {};
        const result = resolveConfig(props, themeWithoutLighting);

        expect(result.lighting3d.enabled).toBe(false);
        expect(result.lighting3d.position).toEqual({ x: 30, y: 30 });
        expect(result.lighting3d.intensity).toBe(0.3);
      });
    });

    describe('Size Property (Bug Fix)', () => {
      it('should ensure size is always defined from defaults', () => {
        const props: MeshGradientProps = {};
        const result = resolveConfig(props);

        expect(result.size).toBeDefined();
        expect(result.size).toBe(80);
      });

      it('should preserve explicit size prop', () => {
        const props: MeshGradientProps = {
          size: 120
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.size).toBe(120);
      });

      it('should handle string size values', () => {
        const props: MeshGradientProps = {
          size: 'lg'
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.size).toBe('lg');
      });
    });

    describe('Animation Config Merging', () => {
      it('should merge animation config correctly', () => {
        const props: MeshGradientProps = {
          animationConfig: {
            intensity: 2.0,
            easing: 'ease-in'
            // duration missing
          }
        };
        const result = resolveConfig(props, mockTheme);

        expect(result.animationConfig.intensity).toBe(2.0); // From props
        expect(result.animationConfig.easing).toBe('ease-in'); // From props
        expect(result.animationConfig.duration).toBe(8); // From theme
      });

      it('should handle missing animation config in theme', () => {
        const themeWithoutAnimation: ThemePack = {
          ...mockTheme,
          animation: undefined
        };
        const props: MeshGradientProps = {
          animationConfig: {
            intensity: 1.5
          }
        };
        const result = resolveConfig(props, themeWithoutAnimation);

        expect(result.animationConfig.intensity).toBe(1.5); // From props
        expect(result.animationConfig.duration).toBe(10); // From defaults
        expect(result.animationConfig.easing).toBe('ease-in-out'); // From defaults
      });
    });

    describe('Visual Effects Merging', () => {
              it('should merge partial visual effects correctly', () => {
          const props: MeshGradientProps = {
            visualEffects: {
              saturation: 1.8,
              contrast: 1.0,
              brightness: 1.0,
              hue: 0
            }
          };
          const result = resolveConfig(props, mockTheme);
  
          expect(result.visualEffects.saturation).toBe(1.8); // From props
          expect(result.visualEffects.contrast).toBe(1.0); // From props
          expect(result.visualEffects.brightness).toBe(1.0); // From props
          expect(result.visualEffects.hue).toBe(0); // From props
        });

      it('should use defaults when no theme visual effects', () => {
        const themeWithoutEffects: ThemePack = {
          ...mockTheme,
          visualEffects: undefined
        };
        const props: MeshGradientProps = {};
        const result = resolveConfig(props, themeWithoutEffects);

        expect(result.visualEffects.saturation).toBe(1.0);
        expect(result.visualEffects.contrast).toBe(1.0);
        expect(result.visualEffects.brightness).toBe(1.0);
        expect(result.visualEffects.hue).toBe(0);
      });
    });

          describe('Mouse Tracking Resolution', () => {
        it('should ensure all mouse tracking properties are defined', () => {
          const props: MeshGradientProps = {
            mouseTracking: {
              enabled: true,
              mode: 'attract',
              intensity: 0.3,
              radius: 30
            }
          };
          const result = resolveConfig(props, mockTheme);
  
          expect(result.mouseTracking.enabled).toBe(true);
          expect(result.mouseTracking.mode).toBe('attract');
          expect(result.mouseTracking.intensity).toBe(0.3);
          expect(result.mouseTracking.radius).toBe(30);
        });
      });
  });

  describe('getThemeDefaults', () => {
    it('should extract theme defaults correctly', () => {
      const defaults = getThemeDefaults(mockTheme);

      expect(defaults.animated).toBe(true);
      expect(defaults.animationType).toBe('rotation');
      expect(defaults.animationConfig).toEqual({
        duration: 8,
        intensity: 1.5,
        easing: 'ease-out'
      });
      expect(defaults.containerAnimation).toBe('rotation');
      expect(defaults.visualEffects).toEqual({
        saturation: 1.2,
        contrast: 1.1,
        brightness: 0.9,
        hue: 30
      });
      expect(defaults.dropShadow).toBe(25); // size from dropShadow config
      expect(defaults.dropShadowOpacity).toBe(0.6);
      expect(defaults.dropShadowDirection).toEqual({ x: 5, y: 10 });
      expect(defaults.lighting3d).toBe(mockTheme.lighting3d);
    });

    it('should handle theme with no animation', () => {
      const themeWithoutAnimation: ThemePack = {
        backgroundColor: '#000',
        shapes: []
      };
      const defaults = getThemeDefaults(themeWithoutAnimation);

      expect(defaults.animated).toBeUndefined();
      expect(defaults.animationType).toBeUndefined();
      expect(defaults.animationConfig).toBeUndefined();
    });

    it('should handle dropShadow enabled without size', () => {
      const themeWithBasicDropShadow: ThemePack = {
        backgroundColor: '#000',
        shapes: [],
        dropShadow: {
          enabled: true,
          opacity: 0.5,
          direction: { x: 2, y: 4 }
        }
      };
      const defaults = getThemeDefaults(themeWithBasicDropShadow);

      expect(defaults.dropShadow).toBe(true); // enabled but no size
      expect(defaults.dropShadowOpacity).toBe(0.5);
      expect(defaults.dropShadowDirection).toEqual({ x: 2, y: 4 });
    });

    it('should handle disabled dropShadow', () => {
      const themeWithDisabledDropShadow: ThemePack = {
        backgroundColor: '#000',
        shapes: [],
        dropShadow: {
          enabled: false,
          size: 20,
          opacity: 0.7
        }
      };
      const defaults = getThemeDefaults(themeWithDisabledDropShadow);

      expect(defaults.dropShadow).toBeUndefined();
    });
  });
}); 