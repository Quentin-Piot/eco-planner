import { reactRouter } from "@react-router/dev/vite";

import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import packageJson from "./package.json";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  define: {
    APP_VERSION: JSON.stringify(packageJson.version),
  },
  plugins: [reactRouter(), tsconfigPaths()],
});
