import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: "build",
    },
    server: {
        port: 3000,
    },
    preview: {
        port: 4173,
    },
});
