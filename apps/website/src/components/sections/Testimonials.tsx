import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const reviews = [
  "Avis exemple à remplacer par un vrai avis client. Le chantier a été clair, propre et bien expliqué.",
  "Avis exemple à remplacer par un vrai avis client. L’équipe a accompagné le projet avec sérieux.",
  "Avis exemple à remplacer par un vrai avis client. Les finitions correspondent au rendu attendu.",
] as const;

export function Testimonials() {
  return (
    <Section className="bg-ink text-white">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Avis clients</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight lg:text-5xl">
            Des retours à remplacer par vos vrais témoignages
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review} delay={index * 0.05} className="rounded-xl border border-white/10 bg-white/8 p-6">
              <p className="leading-8 text-white/76">“{review}”</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
