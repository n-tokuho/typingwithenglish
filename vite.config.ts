/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages はリポジトリ名のサブパスで配信されるため、base を合わせる。
  // 例: https://n-tokuho.github.io/typingwithenglish/
  base: "/typingwithenglish/",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
