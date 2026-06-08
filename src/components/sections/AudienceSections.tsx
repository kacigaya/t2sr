import { Building2, Home } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AudienceSections() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-6 lg:grid-cols-2">
        <AudienceCard
          icon={<Home className="size-8" aria-hidden="true" />}
          title="Rénovez votre maison ou appartement avec une équipe de confiance"
          text="T2SR accompagne les particuliers dans leurs projets de rénovation intérieure et extérieure : peinture, placo, décoration et pose de cuisine."
          cta="Décrire mon projet"
          href="/particuliers"
        />
        <AudienceCard
          icon={<Building2 className="size-8" aria-hidden="true" />}
          title="Des travaux organisés pour vos bureaux, commerces et locaux professionnels"
          text="T2SR intervient auprès des entreprises, commerces, agences, restaurants et locaux professionnels en Île-de-France."
          cta="Demander un devis professionnel"
          href="/professionnels"
          dark
        />
      </Container>
    </Section>
  );
}

function AudienceCard({
  icon,
  title,
  text,
  cta,
  href,
  dark = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  cta: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <Reveal className={dark ? "rounded-xl bg-ink p-8 text-white lg:p-10" : "rounded-xl bg-soft p-8 lg:p-10"}>
      <div className={dark ? "grid size-16 place-items-center rounded-xl bg-white/10 text-terracotta" : "grid size-16 place-items-center rounded-xl bg-white text-terracotta shadow-lg"}>
        {icon}
      </div>
      <h2 className="mt-8 font-display text-3xl font-black leading-tight tracking-tight">{title}</h2>
      <p className={dark ? "mt-5 leading-8 text-white/70" : "mt-5 leading-8 text-copy"}>{text}</p>
      <ButtonLink to={href} className="mt-8" variant={dark ? "primary" : "secondary"} showArrow>
        {cta}
      </ButtonLink>
    </Reveal>
  );
}
