import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  text,
  cta,
  ctaHref = "/contact",
}: {
  eyebrow: string;
  title: string;
  text: string;
  cta?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-ink py-20 text-white sm:py-24">
      <Container>
        <Reveal className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">{text}</p>
          {cta && <ButtonLink to={ctaHref} className="mt-8" showArrow>{cta}</ButtonLink>}
        </Reveal>
      </Container>
    </section>
  );
}
