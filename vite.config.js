import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Caminho no GitHub Pages. Com domínio próprio, use "/".
export default defineConfig({
  plugins: [react()],
  base: "/tita-lanches/",
});
