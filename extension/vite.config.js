import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    publicDir: "public",
    
    build: {
        outDir: "dist",
        emptyOutDir: true,

        // stop warning from "too big" background.js bc that's norm for loading firebase
        chunkSizeWarningLimit: 1000,

        rollupOptions: {
            // "input" files getting copied
            input: {
                popup: resolve(import.meta.dirname, "src/popup.js"),
                background: resolve(import.meta.dirname, "src/background.js"),
                content: resolve(import.meta.dirname, "src/content.js")
            },

            // names of "output"/created files
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]"
            },
        },
    },
});