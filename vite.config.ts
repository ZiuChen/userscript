import { defineConfig } from 'vite'
import nodeExternals from 'vite-plugin-node-externals'
import { publicPlugin } from './build/publicPlugin'

export default defineConfig({
  build: {
    target: 'node16',
    copyPublicDir: false, // exec copy in publicPlugin, instead
    minify: true,
    sourcemap: 'inline',
    lib: {
      entry: 'src/node/index.ts',
      name: 'checkin',
      formats: ['cjs'],
      fileName: (format) => `checkin.${format}.js`
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    nodeExternals({
      deps: false // dont externalize deps from bundle
    }),
    publicPlugin({
      exclude: ['.sample.env']
    })
  ]
})
