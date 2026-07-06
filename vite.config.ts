import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback-404',
      closeBundle() {
        const distDir = join(process.cwd(), 'dist')
        copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
      },
    },
  ],
  base: '/',
})
