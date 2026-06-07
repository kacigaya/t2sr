import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { QuoteInput, StoredFile } from "../types/quote.ts";

const DATABASE_PATH = process.env.DATABASE_PATH ?? "./data/t2sr.sqlite";

let db: Database | null = null;

// Ouvre (et cree au besoin) la base SQLite, applique le schema.
export function GetDatabase(): Database {
  if (db) return db;

  mkdirSync(dirname(DATABASE_PATH), { recursive: true });

  db = new Database(DATABASE_PATH, { create: true });
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  InitSchema(db);
  return db;
}

// Cree les tables si elles n'existent pas.
function InitSchema(database: Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id            TEXT PRIMARY KEY,
      full_name     TEXT NOT NULL,
      phone         TEXT NOT NULL,
      email         TEXT NOT NULL,
      city          TEXT NOT NULL,
      address       TEXT NOT NULL DEFAULT '',
      work_type     TEXT NOT NULL,
      rooms         TEXT NOT NULL DEFAULT '',
      surface       TEXT NOT NULL DEFAULT '',
      support_state TEXT NOT NULL DEFAULT '',
      budget        TEXT NOT NULL DEFAULT '',
      deadline      TEXT NOT NULL DEFAULT '',
      description   TEXT NOT NULL,
      consent       INTEGER NOT NULL DEFAULT 0,
      created_at    TEXT NOT NULL,
      status        TEXT NOT NULL DEFAULT 'new'
    );

    CREATE TABLE IF NOT EXISTS quote_files (
      id            TEXT PRIMARY KEY,
      quote_id      TEXT NOT NULL,
      original_name TEXT NOT NULL,
      stored_name   TEXT NOT NULL,
      mime_type     TEXT NOT NULL,
      size          INTEGER NOT NULL,
      created_at    TEXT NOT NULL,
      FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
    CREATE INDEX IF NOT EXISTS idx_quote_files_quote_id ON quote_files(quote_id);
  `);
}

// Insere une demande de devis + ses fichiers dans une transaction.
export function InsertQuote(
  quoteId: string,
  input: QuoteInput,
  files: StoredFile[],
): void {
  const database = GetDatabase();
  const now = new Date().toISOString();

  const insertQuote = database.prepare(`
    INSERT INTO quotes (
      id, full_name, phone, email, city, address, work_type, rooms,
      surface, support_state, budget, deadline, description, consent,
      created_at, status
    ) VALUES (
      $id, $full_name, $phone, $email, $city, $address, $work_type, $rooms,
      $surface, $support_state, $budget, $deadline, $description, $consent,
      $created_at, $status
    )
  `);

  const insertFile = database.prepare(`
    INSERT INTO quote_files (
      id, quote_id, original_name, stored_name, mime_type, size, created_at
    ) VALUES (
      $id, $quote_id, $original_name, $stored_name, $mime_type, $size, $created_at
    )
  `);

  const runTransaction = database.transaction(() => {
    insertQuote.run({
      $id: quoteId,
      $full_name: input.fullName,
      $phone: input.phone,
      $email: input.email,
      $city: input.city,
      $address: input.address,
      $work_type: input.workType,
      $rooms: input.rooms.join(","),
      $surface: input.surface,
      $support_state: input.supportState,
      $budget: input.budget,
      $deadline: input.deadline,
      $description: input.description,
      $consent: input.consent ? 1 : 0,
      $created_at: now,
      $status: "new",
    });

    for (const file of files) {
      insertFile.run({
        $id: crypto.randomUUID(),
        $quote_id: quoteId,
        $original_name: file.originalName,
        $stored_name: file.storedName,
        $mime_type: file.mimeType,
        $size: file.size,
        $created_at: now,
      });
    }
  });

  runTransaction();
}
