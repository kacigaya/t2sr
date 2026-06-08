import { ArrowRight } from "lucide-react";
import { REALISATIONS } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function RealisationsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <Section className="bg-soft">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Réalisations</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
              Des placeholders avant/après prêts à remplacer par vos vrais chantiers
            </h2>
            <p className="mt-5 text-copy">À remplacer par vos vraies photos, avis ou certifications.</p>
          </Reveal>
          {compact && <ButtonLink to="/realisations" variant="secondary">Voir les réalisations</ButtonLink>}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {REALISATIONS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="overflow-hidden rounded-xl bg-white shadow-lg shadow-ink/8">
              <div className="image-placeholder aspect-[16/9]" role="img" aria-label={`Image placeholder pour ${item.title} à ${item.city}`} />
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-terracotta">{item.service}</p>
                <h3 className="mt-2 font-display text-2xl font-black text-ink">{item.title}</h3>
                <p className="mt-2 font-bold text-copy">{item.city}, Île-de-France</p>
                <ButtonLink to="/realisations" variant="ghost" className="mt-5 px-0 text-terracotta">
                  Voir le projet <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
