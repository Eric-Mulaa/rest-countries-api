import { defineConfig } from 'vite'
import wyw from '@wyw-in-js/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets:["@babel/preset-react", "@babel/preset-typescript"]
      }
    }),
    react(),
    viteTsConfigPaths()

  ],
})
