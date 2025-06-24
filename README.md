# CSS Mesh

Animated gradient backgrounds using CSS blur effects and positioned ellipses - no WebGL required.

## ✨ Features

- 🎨 **20 Built-in Themes** - 10 dark themes + 10 light themes, carefully curated and organized
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

## 🌐 Live Demo

**[cssmesh.dev](https://cssmesh.dev)** - Explore all 20 themes, customize ellipses, try animations, and generate code in real-time.

## 📦 Installation

```bash
npm install css-mesh
```

**NPM Package**: [https://www.npmjs.com/package/css-mesh](https://www.npmjs.com/package/css-mesh)

**GitHub Repository**: [https://github.com/stevesouth/css-mesh](https://github.com/stevesouth/css-mesh)

## 🎨 CSS-Based Approach

CSS Mesh creates beautiful animated gradients using pure CSS techniques:

### ✨ Key Qualities
- **Pure CSS animations** - Leverages browser-native CSS blur and transforms
- **Lightweight bundle** - Minimal dependencies, fast loading
- **Familiar patterns** - Standard CSS/React patterns for easy customization
- **Drop-in component** - Simple integration with familiar React props
- **Reliable performance** - Predictable CSS animations that work everywhere

### 🎯 Perfect For
- Landing page backgrounds
- Hero sections  
- App backgrounds
- Marketing sites
- Any project wanting beautiful animated gradients

## 🎨 Available Themes

### Dark Themes (10)
| Theme | Style | Colors |
|-------|-------|---------|
| `sunset` | Warm | Oranges & pinks |
| `ocean` | Cool | Blues & teals |
| `aurora` | Vibrant | Purples & greens |
| `cosmic` | Dark | Deep space colors |
| `forest` | Natural | Greens & earth tones |
| `monochrome` | Minimal | Grays & blues |
| `volcanic` | Dramatic | Reds & oranges |
| `electric` | Bold | Neon blues & purples |
| `neon` | Vibrant | Bright neon colors |
| `shapes` | Demo | Mixed geometric shapes |

### Light Themes (10)
| Theme | Style | Colors |
|-------|-------|---------|
| `minimal` | Clean | Soft blues & grays |
| `dreamy` | Soft | Pastel pinks & purples |
| `spring` | Fresh | Light greens & pastels |
| `sky` | Airy | Light blues & whites |
| `cream` | Warm | Cream & beige tones |
| `dawn` | Gentle | Soft oranges & pinks |
| `pearl` | Elegant | Pearl & lavender |
| `blush` | Delicate | Soft pinks & roses |
| `lavender` | Serene | Purple & lavender |
| `mint` | Cool | Mint green & aqua |

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
