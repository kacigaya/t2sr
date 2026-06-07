// Donnees centrales de l'entreprise. Source: annuaire-entreprises.data.gouv.fr
// Ne pas inventer de certifications, labels ou assurances.

export const SITE = {
  name: "T2SR",
  legalName: "T2SR",
  tagline: "Peinture, rénovation et travaux du bâtiment",
  siren: "822 433 306",
  ape: "43.34Z",
  apeLabel: "Travaux de peinture et vitrerie",
  city: "Savigny-le-Temple",
  department: "Seine-et-Marne",
  region: "Île-de-France",
  // À compléter par l'éditeur (non fournis dans les sources publiques).
  phone: "",
  email: "",
  address: "",
  url: "https://t2sr.fr",
  apiUrl: import.meta.env.PUBLIC_API_URL ?? "https://api.t2sr.fr",
} as const;

// Zones d'intervention pour le SEO local.
export const SERVICE_AREAS = [
  "Savigny-le-Temple",
  "Seine-et-Marne",
  "Île-de-France",
] as const;
