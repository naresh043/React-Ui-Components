// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default defineConfig({
  plugins: [react(), peerDepsExternal()],
  build: {
    lib: {
      entry: 'src/index.js', // your library's entry point
      name: 'MyReactLibrary',
      fileName: (format) => `my-react-library.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // mark react as external
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});