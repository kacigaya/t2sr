import CardNav, { type CardNavItem } from "./CardNav";
import { Footer } from "./Footer";

const NAV_ITEMS: CardNavItem[] = [
  {
    label: "Services",
    bgColor: "#1F2A37",
    textColor: "#fff",
    links: [
      { label: "Tous les services", href: "/services", ariaLabel: "Tous les services" },
      { label: "Réalisations", href: "/realisations", ariaLabel: "Réalisations" },
    ],
  },
  {
    label: "Entreprise",
    bgColor: "#2A3645",
    textColor: "#fff",
    links: [
      { label: "Professionnels", href: "/professionnels", ariaLabel: "Professionnels" },
      { label: "Particuliers", href: "/particuliers", ariaLabel: "Particuliers" },
      { label: "À propos", href: "/a-propos", ariaLabel: "À propos" },
    ],
  },
  {
    label: "Contact",
    bgColor: "#2A3645",
    textColor: "#fff",
    links: [
      { label: "Accueil", href: "/", ariaLabel: "Accueil" },
      { label: "Devis gratuit", href: "/contact", ariaLabel: "Contact" },
    ],
  },
];

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CardNav
        logo="/logo.svg"
        logoAlt="T2SR"
        items={NAV_ITEMS}
        baseColor="#fff"
        menuColor="#1F2A37"
        buttonBgColor="#e67e22"
        buttonTextColor="#fff"
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
