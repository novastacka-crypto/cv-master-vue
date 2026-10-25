import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("cv-site-"),
        },
      },
    }),
    viteSingleFile(),
  ],
  base: "./",
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.js"],
  },
  build: {
    rollupOptions: {
      plugins: [visualizer({ filename: "dist/stats.html", open: false })],
    },
  },
});
