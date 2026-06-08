import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServicePage } from "@/components/sections/ServicePage";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";

export const Route = createFileRoute("/services/peinture-exterieure")({
  head: () => ({ meta: seoMeta(SEO.peintureExterieure) }),
  component: () => <PageLayout><ServicePage slug="peinture-exterieure" /><QuoteSection /></PageLayout>,
});
