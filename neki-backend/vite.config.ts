import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [["./tests/E2E/**", "prisma"]],
    setupFiles: ["./setupTests.ts"], // add reflect metadata for all tests
  },
});
