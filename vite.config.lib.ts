import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Library build configuration - minimal bundle excluding demo components
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  build: {
    lib: {
      // Library entry point - excludes demo components  
      entry: 'src/lib/css-mesh/index.lib.ts',
      name: 'CSSMesh',
      fileName: (format) => `index.${format === 'es' ? 'es.js' : 'js'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize React - users will provide their own
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    // Optimize for library
    minify: 'terser',
    sourcemap: true,
    // Ensure clean builds
    emptyOutDir: true,
    // Don't copy public directory for library builds
    copyPublicDir: false
  },
  // Generate TypeScript declarations
  esbuild: {
    target: 'es2020'
  }
}) 