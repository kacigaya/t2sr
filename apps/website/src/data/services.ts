// Catalogue des services T2SR.
// Positionnement: peinture, rénovation, travaux intérieurs/extérieurs,
// installation cuisine, finitions, revêtements, petits travaux de bâtiment.

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  examples: string[];
  clientInfo: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: "peinture-interieure",
    title: "Peinture intérieure",
    shortDescription:
      "Mise en peinture de murs, plafonds et boiseries pour rafraîchir ou transformer vos pièces.",
    examples: [
      "Peinture de séjour, chambres et couloirs",
      "Plafonds et sous-couches",
      "Peinture de portes, plinthes et boiseries",
    ],
    clientInfo:
      "Préparez le type de finition souhaité (mat, satin, velours) et les couleurs envisagées pour une estimation plus précise.",
    icon: "roller",
  },
  {
    slug: "peinture-exterieure",
    title: "Peinture extérieure",
    shortDescription:
      "Protection et embellissement des surfaces extérieures exposées aux intempéries.",
    examples: [
      "Peinture de façades et murets",
      "Volets, portails et ferronneries",
      "Boiseries extérieures",
    ],
    clientInfo:
      "Les travaux extérieurs dépendent de la météo et de l'état du support. Des photos aident à évaluer la préparation nécessaire.",
    icon: "house",
  },
  {
    slug: "vitrerie",
    title: "Vitrerie",
    shortDescription:
      "Travaux de vitrerie pour vos fenêtres, portes et surfaces vitrées.",
    examples: [
      "Pose et remplacement de vitrages",
      "Réparation de surfaces vitrées",
      "Finitions autour des menuiseries",
    ],
    clientInfo:
      "Indiquez les dimensions approximatives et le type de vitrage si vous les connaissez.",
    icon: "window",
  },
  {
    slug: "renovation-interieure",
    title: "Rénovation intérieure",
    shortDescription:
      "Rénovation complète ou partielle de vos espaces intérieurs.",
    examples: [
      "Rafraîchissement de pièces",
      "Préparation et reprise des supports",
      "Coordination de petits travaux liés",
    ],
    clientInfo:
      "Décrivez l'état actuel et le résultat attendu. Plus le projet est détaillé, plus le devis est précis.",
    icon: "tools",
  },
  {
    slug: "installation-cuisine",
    title: "Installation de cuisine",
    shortDescription:
      "Montage et installation d'éléments de cuisine et finitions associées.",
    examples: [
      "Montage de meubles de cuisine",
      "Pose et ajustements",
      "Finitions et raccords",
    ],
    clientInfo:
      "Précisez si la cuisine est déjà achetée et son fournisseur, ainsi que les contraintes de la pièce.",
    icon: "kitchen",
  },
  {
    slug: "revetements-muraux",
    title: "Revêtements muraux",
    shortDescription:
      "Pose de revêtements muraux pour décorer et protéger vos murs.",
    examples: [
      "Pose de papier peint et toile",
      "Revêtements décoratifs",
      "Préparation des supports",
    ],
    clientInfo:
      "Indiquez le type de revêtement souhaité et la surface concernée.",
    icon: "wall",
  },
  {
    slug: "revetements-sols",
    title: "Revêtements de sols",
    shortDescription:
      "Pose de revêtements de sol adaptés à chaque pièce.",
    examples: [
      "Pose de sols souples",
      "Préparation et ragréage léger",
      "Finitions et plinthes",
    ],
    clientInfo:
      "Mesurez la surface au sol et précisez le type de revêtement envisagé.",
    icon: "floor",
  },
  {
    slug: "travaux-finition",
    title: "Travaux de finition",
    shortDescription:
      "Reprises, raccords et retouches pour finir le chantier proprement.",
    examples: [
      "Reprises et raccords",
      "Joints et finitions",
      "Retouches après travaux",
    ],
    clientInfo:
      "Listez les points à finaliser pour un chiffrage adapté.",
    icon: "brush",
  },
  {
    slug: "petits-travaux",
    title: "Petits travaux de bâtiment",
    shortDescription:
      "Interventions ponctuelles et petits travaux pour entretenir votre logement.",
    examples: [
      "Petites réparations",
      "Travaux ponctuels",
      "Entretien courant",
    ],
    clientInfo:
      "Décrivez précisément l'intervention souhaitée et son urgence éventuelle.",
    icon: "wrench",
  },
  {
    slug: "travaux-exterieurs",
    title: "Travaux extérieurs",
    shortDescription:
      "Travaux de façade et entretien des extérieurs.",
    examples: [
      "Travaux de façade",
      "Entretien extérieur",
      "Finitions extérieures",
    ],
    clientInfo:
      "Des photos de l'existant facilitent une première estimation.",
    icon: "outdoor",
  },
];

// Catégories utilisées sur la page Réalisations.
export const REALISATION_CATEGORIES = [
  "Peinture",
  "Cuisine",
  "Rénovation",
  "Extérieur",
  "Sols",
] as const;
