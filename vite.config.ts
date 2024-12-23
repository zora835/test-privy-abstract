import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), nodePolyfills(), tsconfigPaths()],
    server: {
        port: 5211,
    },
    define: {
        __BUILD_TIME__: String(Date.now()),
    },
    optimizeDeps: {
        exclude: ["js-big-decimal"],
    },
})
