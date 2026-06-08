import { SERVICES, type ServiceSlug } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return null;
  const Icon = service.icon;
  return (
    <>
      <PageHero
        eyebrow={service.audience}
        title={`${service.title} en Île-de-France`}
        text={service.description}
        cta="Demander un devis gratuit"
      />
      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="rounded-xl bg-soft p-8">
            <div className="grid size-16 place-items-center rounded-xl bg-terracotta text-white">
              <Icon className="size-8" aria-hidden="true" />
            </div>
            <h2 className="mt-8 font-display text-3xl font-black text-ink">Une prestation cadrée et lisible</h2>
            <p className="mt-5 leading-8 text-copy">
              T2SR vous aide à clarifier le besoin, l’état du support, les délais et les priorités avant de démarrer les travaux.
            </p>
          </Reveal>
          <Reveal className="grid gap-6">
            <div>
              <h2 className="font-display text-4xl font-black text-ink">Ce que comprend l’intervention</h2>
              <p className="mt-5 leading-8 text-copy">
                Préparation, protection des zones concernées, exécution soignée et finitions propres. Les détails exacts sont confirmés au devis selon votre chantier.
              </p>
            </div>
            <div className="rounded-xl border border-terracotta/30 bg-terracotta/8 p-6">
              <h3 className="font-display text-xl font-black text-ink">Preuve à compléter</h3>
              <p className="mt-3 leading-7 text-copy">À remplacer par vos vraies photos, avis ou certifications.</p>
            </div>
            <ButtonLink to="/contact" showArrow>Recevoir mon devis gratuit</ButtonLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
