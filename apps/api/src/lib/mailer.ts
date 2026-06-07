import nodemailer from "nodemailer";
import type { QuoteInput } from "../types/quote.ts";

const SMTP_HOST = process.env.SMTP_HOST ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? "";
const SMTP_FROM = process.env.SMTP_FROM ?? "";
const SMTP_TO = process.env.SMTP_TO ?? "";

// SMTP actif uniquement si l'hote est configure.
export function MailerEnabled(): boolean {
  return SMTP_HOST.length > 0 && SMTP_TO.length > 0;
}

function BuildTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined,
  });
}

// Envoie une notification de nouvelle demande de devis.
// Ne jette jamais: l'echec email ne doit pas faire echouer l'enregistrement.
export async function SendQuoteNotification(
  quoteId: string,
  input: QuoteInput,
  fileCount: number,
): Promise<void> {
  if (!MailerEnabled()) return;

  const lines = [
    `Nouvelle demande de devis (${quoteId})`,
    "",
    `Nom        : ${input.fullName}`,
    `Telephone  : ${input.phone}`,
    `Email      : ${input.email}`,
    `Ville      : ${input.city}`,
    `Adresse    : ${input.address || "-"}`,
    `Travaux    : ${input.workType}`,
    `Pieces     : ${input.rooms.join(", ") || "-"}`,
    `Surface    : ${input.surface || "-"}`,
    `Support    : ${input.supportState || "-"}`,
    `Budget     : ${input.budget || "-"}`,
    `Delai      : ${input.deadline || "-"}`,
    `Fichiers   : ${fileCount}`,
    "",
    "Description:",
    input.description,
  ];

  try {
    const transport = BuildTransport();
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_TO,
      replyTo: input.email,
      subject: `Devis T2SR — ${input.fullName} (${input.workType})`,
      text: lines.join("\n"),
    });
  } catch (error) {
    // Log minimal, sans donnees sensibles.
    console.error("[mailer] echec envoi notification:", (error as Error).message);
  }
}
