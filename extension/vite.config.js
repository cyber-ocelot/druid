import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    publicDir: "public",
    
    build: {
        outDir: "dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                popup: resolve(import.meta.dirname, "src/popup.js"),
                background: resolve(import.meta.dirname, "src/background.js"),
                content: resolve(import.meta.dirname, "src/content.js")
            },

            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash].[ext]"
            },
        },
    },
});