import type { QuoteInput, StoredFile, ValidationResult } from "../types/quote.ts";

// Limites fichiers (alignees avec le formulaire cote client).
export const MAX_FILES = 5;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

// Limites texte pour eviter les abus.
const MAX_TEXT = 2000;
const MAX_SHORT = 200;

// Valeurs autorisees (listes fermees) — refus de toute valeur inconnue.
const ALLOWED_SURFACE = [
  "moins-10",
  "10-30",
  "30-60",
  "60-100",
  "plus-100",
  "inconnu",
];

const ALLOWED_SUPPORT = [
  "neuf",
  "bon",
  "rafraichir",
  "abime",
  "renover",
];

const ALLOWED_BUDGET = [
  "moins-1000",
  "1000-3000",
  "3000-10000",
  "plus-10000",
  "a-definir",
];

const ALLOWED_DEADLINE = [
  "urgent",
  "1-mois",
  "3-mois",
  "flexible",
];

const ALLOWED_CUSTOMER_TYPE = ["particulier", "professionnel"];

const ALLOWED_WORK_TYPE = [
  "placo-platrerie",
  "peinture-interieure",
  "peinture-exterieure",
  "decoration-interieure",
  "installation-cuisine",
  "renovation-b2b",
  "renovation-b2c",
  // Compatibilite avec l'ancien catalogue de services.
  "vitrerie",
  "renovation-interieure",
  "revetements-muraux",
  "revetements-sols",
  "travaux-finition",
  "petits-travaux",
  "travaux-exterieurs",
];

const ALLOWED_ROOMS = [
  "cuisine",
  "salon",
  "chambre",
  "salle-de-bain",
  "wc",
  "couloir",
  "escalier",
  "garage",
  "cave",
  "facade",
  "terrasse",
  "bureau",
  "commerce",
  "autre",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Telephone FR souple: chiffres, espaces, +, -, ., parentheses; 6 a 20 caracteres utiles.
const PHONE_RE = /^[+]?[\d\s().-]{6,20}$/;

function Trim(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function FileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

// Valide les champs texte d'une demande de devis a partir d'un FormData.
export function ValidateQuote(form: FormData): ValidationResult {
  const errors: string[] = [];

  const fullName = Trim(form.get("fullName"));
  const phone = Trim(form.get("phone"));
  const email = Trim(form.get("email"));
  const customerType = Trim(form.get("customerType"));
  const city = Trim(form.get("city"));
  const address = Trim(form.get("address"));
  const workType = Trim(form.get("workType"));
  const surface = Trim(form.get("surface"));
  const supportState = Trim(form.get("supportState"));
  const budget = Trim(form.get("budget"));
  const deadline = Trim(form.get("deadline"));
  const description = Trim(form.get("description"));
  const consentRaw = Trim(form.get("consent"));
  const rooms = form.getAll("rooms").filter((v): v is string => typeof v === "string");

  // --- Champs obligatoires ---
  if (!fullName) errors.push("Le nom complet est obligatoire.");
  if (fullName.length > MAX_SHORT) errors.push("Le nom est trop long.");

  if (!phone) errors.push("Le telephone est obligatoire.");
  else if (!PHONE_RE.test(phone)) errors.push("Le numero de telephone est invalide.");

  if (!email) errors.push("L'email est obligatoire.");
  else if (!EMAIL_RE.test(email) || email.length > MAX_SHORT) errors.push("L'email est invalide.");

  if (!customerType) errors.push("Le type de client est obligatoire.");
  else if (!ALLOWED_CUSTOMER_TYPE.includes(customerType)) errors.push("Type de client invalide.");

  if (!city) errors.push("La ville est obligatoire.");
  if (city.length > MAX_SHORT) errors.push("La ville est trop longue.");

  if (!workType) errors.push("Le type de travaux est obligatoire.");
  if (workType.length > MAX_SHORT) errors.push("Le type de travaux est trop long.");
  if (workType && !ALLOWED_WORK_TYPE.includes(workType)) errors.push("Type de travaux invalide.");

  if (!description) errors.push("La description du projet est obligatoire.");
  if (description.length > MAX_TEXT) errors.push("La description est trop longue.");

  const consent = consentRaw === "true" || consentRaw === "on" || consentRaw === "1";
  if (!consent) errors.push("Le consentement RGPD est obligatoire.");

  // --- Champs recommandes: valides seulement si fournis ---
  if (address.length > MAX_SHORT) errors.push("L'adresse est trop longue.");
  if (surface && !ALLOWED_SURFACE.includes(surface)) errors.push("Surface invalide.");
  if (supportState && !ALLOWED_SUPPORT.includes(supportState)) errors.push("Etat du support invalide.");
  if (budget && !ALLOWED_BUDGET.includes(budget)) errors.push("Budget invalide.");
  if (deadline && !ALLOWED_DEADLINE.includes(deadline)) errors.push("Delai invalide.");

  const cleanRooms = rooms.filter((r) => ALLOWED_ROOMS.includes(r));
  if (rooms.length !== cleanRooms.length) errors.push("Piece concernee invalide.");

  if (errors.length > 0) return { valid: false, errors };

  const data: QuoteInput = {
    fullName,
    phone,
    email,
    customerType,
    city,
    address,
    workType,
    rooms: cleanRooms,
    surface,
    supportState,
    budget,
    deadline,
    description,
    consent,
  };

  return { valid: true, errors: [], data };
}

// Valide les fichiers joints (taille, extension, mime, nombre).
export function ValidateFiles(files: File[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (files.length > MAX_FILES) {
    errors.push(`Maximum ${MAX_FILES} fichiers autorises.`);
  }

  for (const file of files) {
    if (file.size === 0) continue; // champ vide ignore
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`Le fichier "${file.name}" depasse 5 Mo.`);
    }
    const ext = FileExtension(file.name);
    if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
      errors.push(`Extension non autorisee pour "${file.name}".`);
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      errors.push(`Type de fichier non autorise pour "${file.name}".`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export type { StoredFile };
