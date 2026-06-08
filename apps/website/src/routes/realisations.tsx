import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { RealisationsGrid } from "@/components/sections/RealisationsGrid";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";

export const Route = createFileRoute("/realisations")({
  head: () => ({ meta: seoMeta(SEO.realisations) }),
  component: () => (
    <PageLayout>
      <PageHero
        eyebrow="Réalisations"
        title="Avant / après et projets T2SR"
        text="Cette galerie contient des placeholders de réalisations. À remplacer par vos vraies photos, avis ou certifications."
        cta="Envoyer mes photos"
      />
      <RealisationsGrid />
      <QuoteSection />
    </PageLayout>
  ),
});
