import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate' })],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "https://bonkumovies.com/wp-admin/admin-ajax.php": {
        target: "https://bonkumovies.com", // Target URL (the external domain)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


