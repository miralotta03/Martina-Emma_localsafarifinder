// Körs efter `next build` (se package.json). Rättar en bugg i Next.js statiska
// export på Windows: routerns datafiler för klientnavigering ska heta t.ex.
//   out/om-oss/__next.om-oss.__PAGE__.txt
// men på Windows ersätts bara "/" (inte "\") med ".", så de hamnar i mappar:
//   out/om-oss/__next.om-oss/__PAGE__.txt
// och webbläsaren får 404 när den hämtar dem. Skriptet plattar ut sådana mappar
// till rätt filnamn. På Linux (Cloudflares bygge) finns inga sådana mappar, så
// där gör det ingenting.
import fs from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

async function* files(dir, prefix = "") {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full, `${prefix}${entry.name}.`);
    else yield { full, name: `${prefix}${entry.name}` };
  }
}

let moved = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for await (const file of files(full, `${entry.name}.`)) {
        await fs.rename(file.full, path.join(dir, file.name));
        moved++;
      }
      await fs.rm(full, { recursive: true });
    } else {
      await walk(full);
    }
  }
}

await walk(outDir);
if (moved > 0) {
  console.log(`[export] ${moved} segmentfiler fick rätt namn (Windows).`);
}
