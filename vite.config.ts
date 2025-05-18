import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: [
         { find: "@", replacement: path.resolve(__dirname, "src") },
         { find: "@adapters", replacement: path.resolve(__dirname, "src/adapters") },
         { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
         { find: "@components", replacement: path.resolve(__dirname, "src/components") },
         { find: "@composables", replacement: path.resolve(__dirname, "src/composables") },
         { find: "@constants", replacement: path.resolve(__dirname, "src/constants") },
         { find: "@models", replacement: path.resolve(__dirname, "src/models") },
         { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
         { find: "@schemas", replacement: path.resolve(__dirname, "src/schemas") },
         { find: "@services", replacement: path.resolve(__dirname, "src/services") },
         { find: "@stores", replacement: path.resolve(__dirname, "src/stores") },
         { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
         { find: "@views", replacement: path.resolve(__dirname, "src/views") },
      ],
   },
});
