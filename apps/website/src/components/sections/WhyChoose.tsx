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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, index) => (
            <Reveal key={advantage} delay={index * 0.04} className="rounded-xl bg-white p-6 shadow-sm">
              <CheckCircle2 className="size-7 text-terracotta" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-black text-ink">{advantage}</h3>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
