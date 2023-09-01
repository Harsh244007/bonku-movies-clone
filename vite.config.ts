import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
// target: "https://bonkumovies.com/wp-admin/admin-ajax.php", // Target URL (the external domain)


