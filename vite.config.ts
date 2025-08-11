import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import ViteSitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ViteSitemap(
    {
      hostname: 'https://srivenkateshtraders.in',
      // routes: [
      //   '/',             // Home
      //   '/shop',          // Shop page
      //   "/track-order",   // Track Order page
      //   '/Aboutus',        // About page
      //   '/Contactus',      // Contact page
      // ],
      outDir: 'dist'
    }
  )],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
