import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { GetDatabase } from "./lib/database.ts";
import { RateLimit, SecurityHeaders } from "./lib/security.ts";
import { MAX_FILES, MAX_FILE_SIZE } from "./lib/validation.ts";
import { quotes } from "./routes/quotes.ts";

const PORT = Number(process.env.PORT ?? 8787);
const WEBSITE_ORIGIN = process.env.WEBSITE_ORIGIN ?? "http://localhost:4321";

// Marge pour les champs texte + overhead multipart en plus des fichiers.
const BODY_LIMIT = MAX_FILES * MAX_FILE_SIZE + 1024 * 1024;

// Initialise la base au demarrage (cree fichier + schema si absent).
GetDatabase();

const app = new Hono();

app.use("*", SecurityHeaders());

app.use(
  "/api/*",
  cors({
    origin: WEBSITE_ORIGIN,
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86_400,
  }),
);

app.get("/health", (c) => c.json({ status: "ok", uptime: process.uptime() }));

app.use("/api/quotes", bodyLimit({
  maxSize: BODY_LIMIT,
  onError: (c) =>
    c.json({ success: false, error: "Requete trop volumineuse." }, 413),
}));
app.use("/api/quotes", RateLimit());

app.route("/api/quotes", quotes);

app.notFound((c) => c.json({ success: false, error: "Route introuvable." }, 404));

console.log(`[api] T2SR API en ecoute sur http://127.0.0.1:${PORT}`);
console.log(`[api] CORS autorise pour: ${WEBSITE_ORIGIN}`);

export default {
  port: PORT,
  fetch: app.fetch,
};
