import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteGlslify from "./plugins/viteGlslify";

export default defineConfig({
    plugins: [tsconfigPaths(), viteGlslify()],
});
