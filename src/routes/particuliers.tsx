import { createFileRoute } from "@tanstack/react-router";
import { ChefHat, Home, PaintRoller } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SEO, seoMeta } from "@/data/seo";

const individualCards = [
  { title: "Maison et appartement", icon: Home },
  { title: "Peinture intérieure Île-de-France", icon: PaintRoller },
  { title: "Pose cuisine Île-de-France", icon: ChefHat },
] as const;

export const Route = createFileRoute("/particuliers")({
  head: () => ({ meta: seoMeta(SEO.particuliers) }),
  component: Individuals,
});

function Individuals() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Particuliers B2C"
        title="Rénovation maison et appartement en Île-de-France"
        text="T2SR accompagne les particuliers dans leurs projets de rénovation intérieure et extérieure : peinture, placo, décoration et pose de cuisine."
        cta="Décrire mon projet"
      />
      <Section>
        <Container className="grid gap-5 md:grid-cols-3">
          {individualCards.map(({ title, icon: Icon }) => (
            <Reveal key={title} className="rounded-xl bg-soft p-7">
              <Icon className="size-8 text-terracotta" aria-hidden="true" />
              <h2 className="mt-6 font-display text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-copy">Un accompagnement clair pour transformer votre espace sans ajouter de complexité inutile.</p>
            </Reveal>
          ))}
        </Container>
      </Section>
      <QuoteSection />
    </PageLayout>
  );
}
