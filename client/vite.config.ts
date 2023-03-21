import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom'
  },
  server:{
    port: 80
  },
})
