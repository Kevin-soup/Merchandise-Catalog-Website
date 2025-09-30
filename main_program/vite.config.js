import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/announcement": "http://localhost:4006", // Microservice A: Site-Wide Announcement
      "/auth": "http://localhost:4000",         // Microservice B: Admin Auth
      "/images": "http://localhost:4004",       // Microservice C: Image Upload (GET/DELETE)
      "/upload": "http://localhost:4004",       // Microservice C: Image Upload (POST)
      "/products": "http://localhost:4002",     // Microservice D: Product Catalog
    },
  },
});