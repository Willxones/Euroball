import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SPACE_ID': JSON.stringify(env.SPACE_ID),
      'process.env.DELIVERY_ACCESS_TOKEN' : JSON.stringify(env.DELIVERY_ACCESS_TOKEN),
      'process.env.CMA_ACCESS_TOKEN' : JSON.stringify(env.CMA_ACCESS_TOKEN),
      'process.env.EMAIL_ADDRESS' : JSON.stringify(env.EMAIL_ADDRESS),
      'process.env.GA_TRACKING_ID' : JSON.stringify(env.GA_TRACKING_ID),
      'process.env.FIREBASE_KEY' : JSON.stringify(env.FIREBASE_KEY),
      'process.env.FIREBASE_DOMAIN' : JSON.stringify(env.FIREBASE_DOMAIN),
      'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_DOMAIN' : JSON.stringify(env.FIREBASE_STORAGE_DOMAIN),
      'process.env.FIREBASE_SENDER_ID' : JSON.stringify(env.FIREBASE_SENDER_ID),
      'process.env.FIREBASE_APP_ID' : JSON.stringify(env.FIREBASE_APP_ID)
    },
    plugins: [react()],
  }
})
