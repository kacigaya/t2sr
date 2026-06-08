import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/data/services";
import { SERVICE_AREAS, SITE } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-3xl font-black">
            T<span className="text-terracotta">2</span>SR
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
            Placo, peinture, décoration et installation de cuisine pour particuliers et professionnels en Île-de-France.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            À remplacer par vos vraies photos, avis ou certifications.
          </p>
        </div>
        <FooterColumn title="Services">
          {SERVICES.slice(0, 5).map((service) => (
            <Link key={service.slug} to={service.href} className="hover:text-terracotta">
              {service.title}
            </Link>
          ))}
        </FooterColumn>
        <FooterColumn title="Zone d’intervention">
          {SERVICE_AREAS.slice(0, 5).map((area) => (
            <span key={area}>{area}</span>
          ))}
        </FooterColumn>
        <FooterColumn title="Contact">
          <Link to="/contact" className="hover:text-terracotta">Demander un devis</Link>
          <span>{SITE.phone || "Téléphone à compléter"}</span>
          <span>{SITE.email || "Email à compléter"}</span>
          <Link to="/mentions-legales" className="mt-3 hover:text-terracotta">Mentions légales</Link>
          <Link to="/politique-confidentialite" className="hover:text-terracotta">Politique de confidentialité</Link>
        </FooterColumn>
      </Container>
      <Container className="border-t border-white/10 py-5 text-xs text-white/55">
        © {new Date().getFullYear()} T2SR. Tous droits réservés.
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-black uppercase tracking-[0.18em] text-white">{title}</h2>
      <div className="mt-4 grid gap-2 text-sm text-white/68">{children}</div>
    </div>
  );
}
