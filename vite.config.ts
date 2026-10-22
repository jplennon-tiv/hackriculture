import { fileURLToPath } from "node:url";
import vinext from "vinext";
import { defineConfig } from "vite";

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig({
  resolve: { alias: { "@shared": fileURLToPath(new URL("../hackriculture-data", import.meta.url)) } },
  plugins: [vinext()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    ...(isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : {}),
  },
});
