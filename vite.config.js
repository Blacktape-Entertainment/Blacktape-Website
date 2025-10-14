// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Blacktape-Website/", // use repo name with leading and trailing slash
  plugins: [tailwindcss(), react()],
});
