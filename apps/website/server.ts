import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
// Le fichier est genere par `vite build` via TanStack Start.
// @ts-expect-error dist/server/server.js n'existe pas avant le build et n'emet pas de .d.ts.
import serverEntry from "./dist/server/server.js";

const clientDir = join(import.meta.dir, "dist/client");
const port = Number(process.env.PORT ?? 4321);
const hostname = process.env.HOST ?? "127.0.0.1";

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function staticResponse(pathname: string) {
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(clientDir, normalized === "/" ? "/index.html" : normalized);
  if (!filePath.startsWith(clientDir) || !existsSync(filePath)) return null;

  const ext = extname(filePath);
  const headers = new Headers({
    "Content-Type": contentTypes[ext] ?? "application/octet-stream",
  });
  if (pathname.startsWith("/assets/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return new Response(Bun.file(filePath), { headers });
}

Bun.serve({
  hostname,
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const asset = staticResponse(url.pathname);
    if (asset) return asset;
    return serverEntry.fetch(request);
  },
});

console.log(`[website] T2SR TanStack Start SSR sur http://${hostname}:${port}`);
