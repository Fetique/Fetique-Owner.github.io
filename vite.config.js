import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** `base: "./"` — корректные пути к ассетам на GitHub Pages (в т.ч. в подпапке репозитория). */
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor";
          }
          if (id.includes("@fortawesome")) return "icons";
          if (id.includes("node_modules/aos")) return "aos";
        }
      }
    },
    cssMinify: true
  },
  // Явный 127.0.0.1: на части Windows «localhost» / IPv6 даёт «нет соединения», пока сервер слушает только IPv4.
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: false
  }
});
