import {
  Building2,
  Brush,
  ChefHat,
  Home,
  PaintRoller,
  PanelsTopLeft,
  Sparkles,
  Store,
} from "lucide-react";

export type ServiceSlug =
  | "placo-platrerie"
  | "peinture-interieure"
  | "peinture-exterieure"
  | "decoration-interieure"
  | "installation-cuisine"
  | "renovation-b2b"
  | "renovation-b2c";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortText: string;
  description: string;
  href: string;
  image: string;
  icon: typeof PanelsTopLeft;
  audience: "Particuliers" | "Professionnels" | "Tous";
}

export const SERVICES: Service[] = [
  {
    slug: "placo-platrerie",
    title: "Placo & plâtrerie",
    shortText:
      "Création de cloisons, doublages, faux plafonds et aménagements intérieurs sur mesure.",
    description:
      "T2SR réalise vos travaux de placo et plâtrerie en Île-de-France avec une attention portée à la préparation, aux alignements et aux finitions propres.",
    href: "/services/placo-platrerie",
    image: "/images/services/placo-platrerie.webp",
    icon: PanelsTopLeft,
    audience: "Tous",
  },
  {
    slug: "peinture-interieure",
    title: "Peinture intérieure",
    shortText:
      "Des murs et plafonds propres, modernes et harmonieux pour valoriser vos espaces.",
    description:
      "Peinture intérieure en Île-de-France pour appartements, maisons, bureaux et commerces, avec préparation des supports et rendu soigné.",
    href: "/services/peinture-interieure",
    image: "/images/services/peinture-interieure.webp",
    icon: PaintRoller,
    audience: "Tous",
  },
  {
    slug: "peinture-exterieure",
    title: "Peinture extérieure",
    shortText:
      "Rafraîchissement et protection de vos façades, murs extérieurs et surfaces visibles.",
    description:
      "Travaux de peinture extérieure pour protéger et moderniser les surfaces visibles, selon l’état du support et les contraintes météo.",
    href: "/services/peinture-exterieure",
    image: "/images/services/peinture-exterieure.webp",
    icon: Home,
    audience: "Tous",
  },
  {
    slug: "decoration-interieure",
    title: "Décoration intérieure",
    shortText:
      "Conseils couleurs, finitions décoratives et ambiance adaptée à votre style.",
    description:
      "Décoration intérieure et finitions pour créer une ambiance cohérente, moderne et durable dans chaque pièce.",
    href: "/services/decoration-interieure",
    image: "/images/services/decoration-interieure.webp",
    icon: Sparkles,
    audience: "Particuliers",
  },
  {
    slug: "installation-cuisine",
    title: "Installation de cuisine",
    shortText:
      "Pose soignée de cuisines avec finitions précises et intégration propre.",
    description:
      "Installation de cuisine en Île-de-France, avec montage, ajustements, finitions et intégration propre dans l’espace existant.",
    href: "/services/installation-cuisine",
    image: "/images/services/installation-cuisine.webp",
    icon: ChefHat,
    audience: "Particuliers",
  },
  {
    slug: "renovation-b2b",
    title: "Rénovation B2B",
    shortText:
      "Travaux pour bureaux, commerces, restaurants, agences et locaux professionnels.",
    description:
      "Travaux organisés pour entreprises, commerces, agences et locaux professionnels en Île-de-France.",
    href: "/professionnels",
    image: "/images/services/renovation-b2b.webp",
    icon: Store,
    audience: "Professionnels",
  },
  {
    slug: "renovation-b2c",
    title: "Rénovation B2C",
    shortText:
      "Accompagnement des particuliers pour maisons, appartements et projets de rénovation.",
    description:
      "Rénovation maison et rénovation appartement en Île-de-France, du cadrage du besoin aux finitions.",
    href: "/particuliers",
    image: "/images/services/renovation-b2c.webp",
    icon: Building2,
    audience: "Particuliers",
  },
];

export const ADVANTAGES = [
  "Devis clair",
  "Intervention en Île-de-France",
  "Travail propre",
  "Finitions soignées",
  "Respect des délais",
  "Accompagnement personnalisé",
] as const;

export const PROCESS_STEPS = [
  "Demande de devis",
  "Échange sur le projet",
  "Visite ou estimation",
  "Réalisation des travaux",
  "Livraison du chantier",
] as const;

export const REALISATIONS = [
  {
    title: "Rénovation peinture appartement",
    service: "Peinture intérieure",
    city: "Paris",
  },
  {
    title: "Pose cuisine moderne",
    service: "Installation de cuisine",
    city: "Boulogne-Billancourt",
  },
  {
    title: "Travaux placo bureaux",
    service: "Placo & plâtrerie",
    city: "Saint-Denis",
  },
  {
    title: "Peinture extérieure maison",
    service: "Peinture extérieure",
    city: "Versailles",
  },
] as const;

export const FAQS = [
  {
    question: "Intervenez-vous dans toute l’Île-de-France ?",
    answer:
      "T2SR étudie les demandes en Île-de-France, avec une priorité autour de Savigny-le-Temple, de la Seine-et-Marne et des secteurs proches.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, vous pouvez envoyer une demande de devis gratuite avec les informations principales et des photos du projet si vous en avez.",
  },
  {
    question: "Travaillez-vous avec les professionnels ?",
    answer:
      "Oui, T2SR intervient pour les bureaux, commerces, restaurants, agences et locaux professionnels.",
  },
  {
    question: "Pouvez-vous gérer plusieurs services sur le même chantier ?",
    answer:
      "Oui, un projet peut regrouper placo, peinture, décoration et installation de cuisine selon les besoins du chantier.",
  },
  {
    question: "Installez-vous des cuisines complètes ?",
    answer:
      "T2SR peut prendre en charge la pose de cuisine et les finitions associées. Les raccordements spécifiques sont cadrés selon le projet.",
  },
  {
    question: "Peut-on envoyer des photos du projet ?",
    answer:
      "Oui, le formulaire permet d’ajouter des photos pour faciliter une première estimation.",
  },
] as const;
