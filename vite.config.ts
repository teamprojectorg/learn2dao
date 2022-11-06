import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from "vite";

const config: UserConfig = {
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
};

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
  // ...other config settings
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});

// export default config;
