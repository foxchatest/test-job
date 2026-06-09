// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src/pages/index",
  publicDir: path.resolve(process.cwd(), "src/public"),
  build: {
    outDir: path.resolve(process.cwd(), "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name).slice(1);

          if (/png|jpg|jpeg|ico|svg|webp/.test(ext)) {
            return "media/[name][extname]";
          }

          if (/woff|woff2/.test(ext)) {
            return "fonts/[name][extname]";
          }

          return "[name][extname]";
        },
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(process.cwd(), "src"),
      public: path.resolve(process.cwd(), "src/public"),
    },
  },
});
