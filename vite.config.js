import { resolve } from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy'

export default {
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
  base: process.env.NODE_ENV === 'production'
    ? '/template-element-ui/'     // 生产环境构建路径, 默认'/template-element-ui/'
    : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          ui: ['element-ui'],
        }
      }
    }
  },
}