import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SPACE_ID': JSON.stringify(env.SPACE_ID),
      'process.env.DELIVERY_ACCESS_TOKEN' : JSON.stringify(env.DELIVERY_ACCESS_TOKEN),
      'process.env.EMAIL_ADDRESS' : JSON.stringify(env.EMAIL_ADDRESS),
      'process.env.GA_TRACKING_ID' : JSON.stringify(env.GA_TRACKING_ID),
      'process.env.ENVIRONMENT' : JSON.stringify(env.ENVIRONMENT)
    },
    plugins: [react()],
  }
})
