import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { SEO, seoMeta } from "@/data/seo";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({ meta: seoMeta(SEO.legal) }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="Mentions légales" title="Mentions légales T2SR" text="Informations légales relatives au site T2SR." />
      <Section>
        <Container className="prose max-w-3xl text-copy">
          <h2 className="font-display text-3xl font-black text-ink">Éditeur</h2>
          <p>T2SR - SIREN {SITE.siren} - Code APE {SITE.ape} ({SITE.apeLabel}).</p>
          <h2 className="mt-8 font-display text-3xl font-black text-ink">Coordonnées</h2>
          <p>Adresse, téléphone et email à compléter par l’éditeur du site.</p>
          <h2 className="mt-8 font-display text-3xl font-black text-ink">Contenus</h2>
          <p>Les photos, avis et certifications placeholders doivent être remplacés par des éléments réels avant publication définitive.</p>
        </Container>
      </Section>
    </PageLayout>
  ),
});
