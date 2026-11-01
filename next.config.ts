import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { deviceSizes, imageSizes } from "./lib/image-sizes.mjs";

// Porten för `npm run dev:api` (formulärens Worker, worker/index.ts).
const DEV_API = "http://localhost:8787";

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Helt statisk sajt: `next build` skriver HTML, CSS, JS och data till
    // out/, som Cloudflare serverar som statiska filer (wrangler.jsonc).
    // Formulärens /api/* hanteras av en liten Worker (worker/index.ts).
    // Under `next dev` behövs ingen export, och /api/* skickas vidare till
    // Workern i `npm run dev:api` (rewrites fungerar inte i en export).
    ...(isDev
      ? {
          rewrites: async () => [
            { source: "/api/:path*", destination: `${DEV_API}/api/:path*` },
          ],
        }
      : { output: "export" as const }),
    images: {
      // Ingen bildserver: WebP-versionerna skapas vid bygget av
      // scripts/build-images.mjs, se lib/image-loader.ts.
      loader: "custom",
      loaderFile: "./lib/image-loader.ts",
      deviceSizes,
      imageSizes,
    },
  };
}
