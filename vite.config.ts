import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: 'extension/dist',
      emptyOutDir: true,
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://www.seaofthieves.com',
          changeOrigin: true,
          headers: {
            referer: 'https://www.seaofthieves.com/',
            cookie: `rat=${env.VITE_RAT}`
          },
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      }
    }
  }
})
