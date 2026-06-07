import { Hono } from "hono";
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { InsertQuote } from "../lib/database.ts";
import { SendQuoteNotification } from "../lib/mailer.ts";
import {
  FileExtension,
  MAX_FILES,
  ValidateFiles,
  ValidateQuote,
} from "../lib/validation.ts";
import type { ApiError, ApiSuccess, StoredFile } from "../types/quote.ts";

// Dossier de stockage HORS du dossier public servi par Nginx.
const UPLOAD_DIR = resolve(process.env.UPLOAD_DIR ?? "./uploads");

export const quotes = new Hono();

quotes.post("/", async (c) => {
  let form: FormData;
  try {
    form = await c.req.formData();
  } catch {
    return c.json<ApiError>(
      { success: false, error: "Format de requete invalide (multipart attendu)." },
      400,
    );
  }

  // Honeypot anti-spam: champ cache qui doit rester vide.
  const honeypot = form.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    // On repond "succes" sans rien stocker pour ne pas renseigner le bot.
    return c.json<ApiSuccess>({ success: true, quoteId: crypto.randomUUID() });
  }

  // Validation des champs texte.
  const result = ValidateQuote(form);
  if (!result.valid || !result.data) {
    return c.json<ApiError>(
      { success: false, error: result.errors[0] ?? "Donnees invalides." },
      400,
    );
  }

  // Recuperation et validation des fichiers.
  const rawFiles = form
    .getAll("files")
    .filter((v): v is File => v instanceof File && v.size > 0);

  if (rawFiles.length > MAX_FILES) {
    return c.json<ApiError>(
      { success: false, error: `Maximum ${MAX_FILES} fichiers autorises.` },
      400,
    );
  }

  const fileCheck = ValidateFiles(rawFiles);
  if (!fileCheck.valid) {
    return c.json<ApiError>(
      { success: false, error: fileCheck.errors[0] ?? "Fichier invalide." },
      400,
    );
  }

  const quoteId = crypto.randomUUID();

  // Ecriture des fichiers avec noms generes cote serveur (jamais le nom client).
  const stored: StoredFile[] = [];
  try {
    mkdirSync(UPLOAD_DIR, { recursive: true });
    for (const file of rawFiles) {
      const ext = FileExtension(file.name);
      const storedName = `${quoteId}_${crypto.randomUUID()}${ext}`;
      const buffer = await file.arrayBuffer();
      await Bun.write(join(UPLOAD_DIR, storedName), buffer);
      stored.push({
        originalName: file.name.slice(0, 200),
        storedName,
        mimeType: file.type,
        size: file.size,
        buffer,
      });
    }
  } catch (error) {
    console.error("[quotes] echec ecriture fichier:", (error as Error).message);
    return c.json<ApiError>(
      { success: false, error: "Erreur lors du traitement des fichiers." },
      500,
    );
  }

  // Enregistrement en base.
  try {
    InsertQuote(quoteId, result.data, stored);
  } catch (error) {
    console.error("[quotes] echec insertion DB:", (error as Error).message);
    return c.json<ApiError>(
      { success: false, error: "Erreur lors de l'enregistrement de la demande." },
      500,
    );
  }

  // Notification email (best-effort, ne bloque pas la reponse en cas d'echec interne).
  await SendQuoteNotification(quoteId, result.data, stored.length);

  return c.json<ApiSuccess>({ success: true, quoteId });
});
