import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CssModuleTypes } from "./watching-css-modules"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), CssModuleTypes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
      libs: `${path.resolve(__dirname, "./src/libs")}`,
    }
  }
})
