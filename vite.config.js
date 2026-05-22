import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    define: {
        "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
}));
