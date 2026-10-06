import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Konfiguration för Cloudflare-bygget (npm run preview / deploy). Påverkar inte
// `next dev` eller `next build`.
//
// Sajten har bara SSG- och SSR-sidor utan revalidering, så förrenderade sidor
// kan läsas direkt från Workers Static Assets. Ingen R2-bucket eller kö
// behövs. Om ISR/revalidate läggs till senare måste en skrivbar cache (t.ex.
// R2) användas i stället, se opennext.js.org/cloudflare/caching.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
