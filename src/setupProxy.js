import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("https://bonkumovies.com/wp-admin/admin-ajax.php", {
    //   target: "http://localhost:5000",
      changeOrigin: true,
      target: "https://bonkumovies.com", // Target URL (the external domain)
    })
  );
}