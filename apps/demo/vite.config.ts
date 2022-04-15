import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@hmans/controlfreak"],
    include: ["react/jsx-runtime"]
  },

  plugins: [react()]
})
