# CSS Mesh

Animated gradient backgrounds using CSS blur effects and positioned ellipses - no WebGL required.

## ✨ Features

- 🎨 **11 Built-in Themes** - 7 base themes + 4 dramatic themes with large overlapping ellipses
- ⚡ **CSS-Based** - Pure CSS blur effects, no WebGL or shaders required
- 🪶 **Lightweight** - Small bundle size, no heavy 3D dependencies
- 🎛️ **Animation System** - 6 animation types: float, pulse, rotation, orbit, wave, hue
- 🖱️ **Mouse Tracking** - Interactive attract/repel modes with configurable intensity
- 🔧 **Fully Customizable** - Configure ellipse size, position, gradients, blur, and opacity
- 🎨 **Visual Effects** - Saturation, contrast, brightness, and hue adjustments
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 📦 **Smart Configs** - Diff-based customization system for efficient overrides

## 🚀 Quick Start

```bash
npm install css-mesh
```

```tsx
import { MeshGradient } from 'css-mesh';

function App() {
  return (
    <MeshGradient 
      theme="sunset" 
      animated={true}
      animationType="float"
    >
      <div>Your content here</div>
    </MeshGradient>
  );
}
```

## 🆚 Why CSS-Based?

Most mesh gradient libraries use WebGL shaders for complex 3D effects. CSS Mesh takes a different approach:

### ✅ Advantages over Shader Libraries
- **No WebGL required** - Works everywhere, better browser compatibility  
- **Smaller bundle** - No Three.js or heavy 3D dependencies
- **Easy to customize** - Standard CSS/React patterns, no GLSL knowledge needed
- **Simpler integration** - Drop-in component with familiar React props
- **Predictable performance** - CSS animations with known behavior

### 🎯 Perfect For
- Landing page backgrounds
- Hero sections  
- App backgrounds
- Marketing sites
- Projects wanting animated gradients without WebGL complexity

## 🎨 Available Themes

### Base Themes (7)
| Theme | Style | Colors |
|-------|-------|---------|
| `sunset` | Warm | Oranges & pinks |
| `ocean` | Cool | Blues & teals |
| `aurora` | Vibrant | Purples & greens |
| `cosmic` | Dark | Deep space colors |
| `electric` | Bold | Neon blues & purples |
| `dreamy` | Light | Soft pastels |
| `forest` | Natural | Greens & earth tones |

### Dramatic Themes (4)
Large overlapping ellipses for bold visual impact:
`volcanic`, `neon`, `galaxy`, `prism`

## 🎛️ Animation Types

- `float` - Gentle floating movement
- `pulse` - Scale pulsing effect  
- `rotation` - Continuous rotation
- `orbit` - Circular orbital motion
- `wave` - Wave-like undulation
- `hue` - Color hue shifting

## 📖 API Reference

### MeshGradient Props

```tsx
interface MeshGradientProps {
  theme?: string;                          // Theme name (default: 'sunset')
  customConfig?: Partial<BackgroundConfig>; // Custom ellipse configuration
  className?: string;                      // Additional CSS classes
  style?: React.CSSProperties;             // Custom styles
  children?: React.ReactNode;              // Content to overlay
  animated?: boolean;                      // Enable animations (default: false)
  animationType?: AnimationType;           // Animation type (default: 'float')
  animationConfig?: Partial<AnimationConfig>; // Animation settings
  containerAnimation?: ContainerAnimationType; // Container-level animations
  mouseTracking?: MouseTrackingConfig;     // Mouse interaction settings
  visualEffects?: VisualEffectsConfig;     // Color/visual adjustments
}
```

## 🔧 Custom Configuration

Create your own ellipse configurations:

```tsx
const customConfig = {
  backgroundColor: '#1a1a2e',
  shapes: [
    {
      id: 'custom-1',
      width: 80,        // Percentage of container width
      height: 30,       // Percentage of container height  
      x: -10,           // X position (percentage, can be negative)
      y: 20,            // Y position (percentage, can be negative)
      gradient: 'radial-gradient(ellipse, #ff6b6b 0%, #ee5a24 100%)',
      blur: 60,         // Blur intensity in pixels
      opacity: 0.7,     // Opacity (0-1)
      zIndex: 1,        // Stacking order
      shape: 'ellipse', // Shape type
    },
    // ... more ellipses
  ],
};

<MeshGradient customConfig={customConfig}>
  <YourContent />
</MeshGradient>
```

## 🖱️ Mouse Tracking

```tsx
<MeshGradient 
  theme="sunset"
  mouseTracking={{
    enabled: true,
    mode: 'attract',    // 'attract' or 'repel'
    intensity: 0.3,     // 0-1 strength
    radius: 30          // Effect radius in pixels
  }}
>
  <YourContent />
</MeshGradient>
```

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

*CSS-based animated gradient backgrounds for React*
