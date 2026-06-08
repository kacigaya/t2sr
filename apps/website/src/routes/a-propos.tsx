import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: seoMeta(SEO.about) }),
  component: About,
});

function About() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="À propos"
        title="T2SR, entreprise de rénovation en Île-de-France"
        text="Une approche professionnelle pour accompagner particuliers et entreprises dans leurs travaux de placo, peinture, décoration et installation de cuisine."
        cta="Contacter T2SR"
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-xl bg-soft p-8">
            <h2 className="font-display text-3xl font-black">Informations entreprise</h2>
            <dl className="mt-6 grid gap-4 text-copy">
              <div><dt className="font-black text-ink">SIREN</dt><dd>{SITE.siren}</dd></div>
              <div><dt className="font-black text-ink">Code APE</dt><dd>{SITE.ape} - {SITE.apeLabel}</dd></div>
              <div><dt className="font-black text-ink">Zone</dt><dd>{SITE.city}, {SITE.department}, {SITE.region}</dd></div>
            </dl>
          </Reveal>
          <Reveal className="rounded-xl bg-ink p-8 text-white">
            <h2 className="font-display text-3xl font-black">Preuves à compléter</h2>
            <p className="mt-5 leading-8 text-white/72">
              À remplacer par vos vraies photos, avis ou certifications. Aucune certification ou label n’est inventé sur le site.
            </p>
          </Reveal>
        </Container>
      </Section>
      <QuoteSection />
    </PageLayout>
  );
}
