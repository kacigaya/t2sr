import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/data/services";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceMotionCardProxy } from "@/routes/-service-card-proxy";
import { QuoteSection } from "@/components/sections/QuoteForm";
import { SEO, seoMeta } from "@/data/seo";
import { Container, Section } from "@/components/ui/Container";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: seoMeta(SEO.services) }),
  component: Services,
});

function Services() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Services"
        title="Placo, peinture, décoration et cuisine pour vos travaux"
        text="T2SR accompagne les particuliers et professionnels en Île-de-France avec des prestations claires, modernes et soignées."
        cta="Demander un devis gratuit"
      />
      <Section className="bg-soft">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => <ServiceMotionCardProxy key={service.slug} service={service} />)}
        </Container>
      </Section>
      <QuoteSection />
    </PageLayout>
  );
}
