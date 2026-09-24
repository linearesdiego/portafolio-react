import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", ""]);
  const target = env.VITE_LLM_PROXY_TARGET || "http://127.0.0.1:8080";
  const proxyKey = env.VITE_LLM_PROXY_KEY || "";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/v1": {
          target,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (proxyKey) proxyReq.setHeader("Authorization", `Bearer ${proxyKey}`);
            });
          },
        },
      },
    },
  };
});
