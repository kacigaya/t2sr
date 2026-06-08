import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, Store } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SEO, seoMeta } from "@/data/seo";

const professionalCards = [
  { title: "Locaux professionnels", icon: Store },
  { title: "Rénovation bureaux Île-de-France", icon: Building2 },
  { title: "Organisation et délais", icon: Clock },
] as const;

export const Route = createFileRoute("/professionnels")({
  head: () => ({ meta: seoMeta(SEO.professionnels) }),
  component: Professionals,
});

function Professionals() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Professionnels B2B"
        title="Des travaux organisés pour vos bureaux, commerces et locaux professionnels"
        text="T2SR intervient auprès des entreprises, commerces, agences, restaurants et locaux professionnels en Île-de-France."
        cta="Demander un devis professionnel"
      />
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {professionalCards.map(({ title, icon: Icon }) => (
            <Reveal key={title} className="rounded-xl bg-soft p-7">
              <Icon className="size-8 text-terracotta" aria-hidden="true" />
              <h2 className="mt-6 font-display text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-copy">Une intervention cadrée pour limiter les zones d’incertitude et garder un chantier lisible.</p>
            </Reveal>
          ))}
        </Container>
      </Section>
      <QuoteSection />
    </PageLayout>
  );
}
