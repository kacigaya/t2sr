import { PROCESS_STEPS } from "@/data/services";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Method() {
  return (
    <Section className="bg-white">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Notre méthode</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Un processus simple, du premier échange à la livraison
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-5 md:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal as="li" key={step} delay={index * 0.05} className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
              <span className="grid size-11 place-items-center rounded-full bg-terracotta font-display text-lg font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 font-display text-lg font-black leading-tight text-ink">{step}</h3>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
