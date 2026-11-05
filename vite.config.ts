import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Relative base so the build works on GitHub Pages (jinaawang.github.io/stockly/) or any host.
export default defineConfig({ plugins: [react()], base: './' })
