import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base: '/stockly/' if deploying to GitHub Pages under the repo name; '/' on Vercel.
export default defineConfig({ plugins: [react()], base: process.env.GITHUB_PAGES ? '/stockly/' : '/' })
