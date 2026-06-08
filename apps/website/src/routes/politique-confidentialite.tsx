import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { SEO, seoMeta } from "@/data/seo";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({ meta: seoMeta(SEO.privacy) }),
  component: () => (
    <PageLayout>
      <PageHero eyebrow="Confidentialité" title="Politique de confidentialité" text="Traitement des données transmises via les demandes de devis T2SR." />
      <Section>
        <Container className="max-w-3xl text-copy">
          <h2 className="font-display text-3xl font-black text-ink">Données collectées</h2>
          <p className="mt-4 leading-8">Les données du formulaire sont utilisées pour traiter votre demande de devis et vous recontacter concernant votre projet.</p>
          <h2 className="mt-8 font-display text-3xl font-black text-ink">Fichiers transmis</h2>
          <p className="mt-4 leading-8">Les photos optionnelles servent uniquement à comprendre le chantier et préparer une première estimation.</p>
          <h2 className="mt-8 font-display text-3xl font-black text-ink">Contact</h2>
          <p className="mt-4 leading-8">Les coordonnées de contact doivent être complétées par l’éditeur du site.</p>
        </Container>
      </Section>
    </PageLayout>
  ),
});
