import type { Context, MiddlewareHandler } from "hono";

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);

interface Bucket {
  count: number;
  resetAt: number;
}

// Rate limiting en memoire par IP. Suffisant pour une instance unique.
// Pour multi-instance, remplacer par un store partage (Redis).
const buckets = new Map<string, Bucket>();

function ClientIp(c: Context): string {
  // Derriere Nginx: X-Forwarded-For renseigne par le reverse proxy.
  const forwarded = c.req.header("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = c.req.header("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

// Nettoie periodiquement les buckets expires pour borner la memoire.
function Sweep(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

// Middleware de rate limiting simple par IP.
export function RateLimit(): MiddlewareHandler {
  return async (c, next) => {
    const now = Date.now();
    if (buckets.size > 10_000) Sweep(now);

    const ip = ClientIp(c);
    const bucket = buckets.get(ip);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (bucket.count >= RATE_LIMIT_MAX) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      c.header("Retry-After", String(retryAfter));
      return c.json(
        { success: false, error: "Trop de requetes. Reessayez plus tard." },
        429,
      );
    }

    bucket.count += 1;
    return next();
  };
}

// En-tetes de securite appliques a toutes les reponses.
export function SecurityHeaders(): MiddlewareHandler {
  return async (c, next) => {
    await next();
    c.header("X-Content-Type-Options", "nosniff");
    c.header("X-Frame-Options", "DENY");
    c.header("Referrer-Policy", "no-referrer");
    c.header("Cross-Origin-Resource-Policy", "same-origin");
    c.header("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  };
}
