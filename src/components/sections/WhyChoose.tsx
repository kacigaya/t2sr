import { CheckCircle2 } from "lucide-react";
import { ADVANTAGES } from "@/data/services";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function WhyChoose() {
  return (
    <Section className="bg-soft">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Pourquoi choisir T2SR ?</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Une approche claire pour des travaux propres et maîtrisés
          </h2>
        </Reveal>
        <Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((advantage) => (
              <li key={advantage} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-terracotta" aria-hidden="true" />
                <span className="font-display text-lg font-bold text-ink">{advantage}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
