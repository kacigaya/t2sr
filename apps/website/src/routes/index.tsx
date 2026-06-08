import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/sections/Hero";
import { StickyServices, MobileServices } from "@/components/sections/StickyServices";
import { AudienceSections } from "@/components/sections/AudienceSections";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Method } from "@/components/sections/Method";
import { RealisationsGrid } from "@/components/sections/RealisationsGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seoMeta(SEO.home) }),
  component: Home,
});

function Home() {
  return (
    <PageLayout>
      <Hero />
      <StickyServices />
      <MobileServices />
      <AudienceSections />
      <WhyChoose />
      <Method />
      <RealisationsGrid compact />
      <Testimonials />
      <FaqSection />
      <QuoteSection />
    </PageLayout>
  );
}
