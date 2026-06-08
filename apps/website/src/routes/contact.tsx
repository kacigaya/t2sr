import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: seoMeta(SEO.contact) }),
  component: () => (
    <PageLayout>
      <PageHero
        eyebrow="Contact / Devis"
        title="Parlez-nous de votre chantier en Île-de-France"
        text="Remplissez le formulaire de devis gratuit pour vos travaux de placo, peinture, décoration, cuisine ou rénovation."
      />
      <QuoteSection />
    </PageLayout>
  ),
});
