import { LOCAL_KEYWORDS, SITE, SERVICE_AREAS } from "./site";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
}

export const SEO: Record<string, SeoConfig> = {
  home: {
    title: "T2SR | Rénovation, placo, peinture et cuisine en Île-de-France",
    description:
      "T2SR transforme vos espaces avec des travaux propres, modernes et durables : placo, peinture, décoration et installation de cuisine en Île-de-France.",
    path: "/",
  },
  services: {
    title: "Services T2SR | Placo, peinture, décoration et cuisine",
    description:
      "Découvrez les services T2SR en Île-de-France : placo, plâtrerie, peinture intérieure, peinture extérieure, décoration et pose de cuisine.",
    path: "/services",
  },
  placo: {
    title: "Plaquiste Île-de-France | Placo et plâtrerie T2SR",
    description:
      "T2SR réalise vos travaux de placo et plâtrerie en Île-de-France : cloisons, doublages, faux plafonds et finitions propres.",
    path: "/services/placo-platrerie",
  },
  peintureInterieure: {
    title: "Peinture intérieure Île-de-France | Artisan peintre T2SR",
    description:
      "Peinture intérieure en Île-de-France pour murs, plafonds et finitions modernes dans maisons, appartements, bureaux et commerces.",
    path: "/services/peinture-interieure",
  },
  peintureExterieure: {
    title: "Peinture extérieure Île-de-France | Façades et murs T2SR",
    description:
      "T2SR prend en charge vos travaux de peinture extérieure en Île-de-France pour protéger et moderniser vos surfaces visibles.",
    path: "/services/peinture-exterieure",
  },
  decoration: {
    title: "Décoration intérieure Île-de-France | Finitions T2SR",
    description:
      "Conseils couleurs, finitions décoratives et ambiance moderne avec T2SR pour vos projets de décoration intérieure en Île-de-France.",
    path: "/services/decoration-interieure",
  },
  cuisine: {
    title: "Pose cuisine Île-de-France | Installation de cuisine T2SR",
    description:
      "Installation de cuisine en Île-de-France : pose soignée, intégration propre, ajustements et finitions précises avec T2SR.",
    path: "/services/installation-cuisine",
  },
  professionnels: {
    title: "Rénovation bureaux Île-de-France | T2SR professionnels",
    description:
      "Travaux organisés pour bureaux, commerces, restaurants, agences et locaux professionnels en Île-de-France.",
    path: "/professionnels",
  },
  particuliers: {
    title: "Rénovation maison et appartement Île-de-France | T2SR",
    description:
      "T2SR accompagne les particuliers pour la rénovation de maison et appartement en Île-de-France : placo, peinture, décoration et cuisine.",
    path: "/particuliers",
  },
  realisations: {
    title: "Réalisations T2SR | Chantiers rénovation Île-de-France",
    description:
      "Découvrez des placeholders de réalisations T2SR à remplacer par vos vraies photos : peinture, cuisine, placo et rénovation.",
    path: "/realisations",
  },
  about: {
    title: "À propos de T2SR | Entreprise de rénovation Île-de-France",
    description:
      "T2SR, entreprise de rénovation en Île-de-France, accompagne particuliers et professionnels avec des travaux propres et soignés.",
    path: "/a-propos",
  },
  contact: {
    title: "Contact et devis gratuit | T2SR Île-de-France",
    description:
      "Contactez T2SR pour un devis gratuit de placo, peinture, décoration, cuisine ou rénovation en Île-de-France.",
    path: "/contact",
  },
  legal: {
    title: "Mentions légales | T2SR",
    description: "Mentions légales du site T2SR, entreprise de travaux en Île-de-France.",
    path: "/mentions-legales",
  },
  privacy: {
    title: "Politique de confidentialité | T2SR",
    description:
      "Politique de confidentialité T2SR concernant le traitement des demandes de devis et des données de contact.",
    path: "/politique-confidentialite",
  },
};

export function seoMeta(config: SeoConfig) {
  const url = `${SITE.url}${config.path === "/" ? "" : config.path}`;
  return [
    { title: config.title },
    { name: "description", content: config.description },
    { name: "keywords", content: LOCAL_KEYWORDS.join(", ") },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE.url}/og-image.svg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
  ];
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    legalName: SITE.legalName,
    description:
      "Entreprise de rénovation Île-de-France spécialisée en placo, peinture, décoration et installation de cuisine.",
    url: SITE.url,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    ...(SITE.email ? { email: SITE.email } : {}),
    identifier: [
      { "@type": "PropertyValue", name: "SIREN", value: SITE.siren },
      { "@type": "PropertyValue", name: "Code APE", value: SITE.ape },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.department,
      addressCountry: "FR",
    },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "Place", name })),
  };
}
