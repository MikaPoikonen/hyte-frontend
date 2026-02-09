import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        yhteystiedot: resolve(__dirname, 'yhteystiedot.html'),
        respontiivisuus: resolve(__dirname, 'respontiivisuus.html'),
        jstreenaus: resolve(__dirname, 'js-treenaus.html')
      },
    },
  },
  base: './',
})
