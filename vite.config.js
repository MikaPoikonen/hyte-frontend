import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',   // TÄRKEÄ LISÄYS
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        bmi: resolve(__dirname, 'BMI/bmi.html'),
        paivakirja: resolve(__dirname, 'rajapinnat/paivakirja.html')
      }
    }
  }
})