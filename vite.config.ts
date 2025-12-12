/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  // Local dev: use "/"
  // Build: use VITE_BASE if provided, otherwise default to "/" (custom domain safe)
  const base = command === "serve" ? "/" : (process.env.VITE_BASE ?? "/");

  return {
    base,
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  };
});
