import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 배포 base 경로.
//   - User/Org 사이트 (https://d0hyun07.github.io/)         → '/'
//   - 프로젝트 사이트 (https://d0hyun07.github.io/repo-name/) → '/repo-name/'
// 현재 레포: d0hyun07.github.io (user 사이트 → 루트 서빙)
const BASE_PATH = '/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) 은 manualChunks 를 함수 형태로 받음.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/vue/') ||
              id.includes('/vue-router/') ||
              id.includes('/pinia/') ||
              id.includes('@vue/')
            ) {
              return 'vendor'
            }
          }
        },
      },
    },
  },
})
