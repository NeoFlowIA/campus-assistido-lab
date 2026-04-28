// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ ... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const allowedHosts = [
  "infra-neotalk-if-demo.k3p3ex.easypanel.host",
  "infra-neotalkif.k3p3ex.easypanel.host",
  ".k3p3ex.easypanel.host",
];

export default defineConfig({
  server: {
    allowedHosts,
  },
  preview: {
    allowedHosts,
  },
});
