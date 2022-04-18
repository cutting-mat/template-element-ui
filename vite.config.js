import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  base: process.env.NODE_ENV === 'production'           // 生产/开发环境构建路径, 默认'/template-element-ui/'
    ? '/template-element-ui/'
    : '/',
  build: {
    outDir: 'dist'
  }
})
