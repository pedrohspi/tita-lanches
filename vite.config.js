import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base" é o caminho do site no GitHub Pages (pedrohspi.github.io/tita-lanches/).
// Se usar domínio próprio, troque para "/".
export default defineConfig({
  plugins: [react()],
  base: "/tita-lanches/",
});
