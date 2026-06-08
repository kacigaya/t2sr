import { Container, Section } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";

export function FaqSection() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Les questions fréquentes avant de lancer vos travaux
          </h2>
        </Reveal>
        <Reveal>
          <FaqAccordion />
        </Reveal>
      </Container>
    </Section>
  );
}
