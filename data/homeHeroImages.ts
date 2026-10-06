import "server-only";
import { readdirSync } from "node:fs";
import path from "node:path";

const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

// Alla bilder i public/home, i namnordning (hero-1, hero-2 … hero-10).
// En ny bild i mappen kommer med i startsidans bildspel utan kodändring.
// Läses när startsidan förrenderas vid bygget (sidan är statisk), så det
// behövs ingen filåtkomst när sajten körs, t.ex. på Cloudflare.
export function getHomeHeroImages(): string[] {
  const dir = path.join(process.cwd(), "public", "home");
  return readdirSync(dir)
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, "sv", { numeric: true }))
    .map((file) => `/home/${file}`);
}
