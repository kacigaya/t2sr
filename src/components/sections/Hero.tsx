import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const proofs = [
  "Intervention en Île-de-France",
  "Devis clair et rapide",
  "Travaux intérieurs & extérieurs",
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[calc(100svh-5rem)] min-h-[760px] overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-x-0 top-0 h-full min-h-[760px] bg-cover bg-[position:72%_center]"
        style={{
          backgroundImage:
            "image-set(url('/images/hero.webp') type('image/webp'), url('/images/hero.png') type('image/png'))",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ scale: 1 }}
        animate={{ scale: reduceMotion ? 1 : 1.08 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        role="img"
        aria-label="Artisan plaquiste travaillant sur un mur dans un chantier intérieur propre"
      />
      <div className="absolute inset-x-0 top-0 h-full min-h-[760px] bg-linear-to-r from-ink via-ink/58 to-ink/0" />
      <div className="absolute inset-x-0 top-0 h-full min-h-[760px] bg-ink/8" />
      <Container className="relative z-10 grid h-full min-h-[760px] items-center py-16">
        <div className="max-w-4xl">
          <motion.p
            className="mb-5 inline-flex text-xs font-extrabold uppercase tracking-[0.2em] text-terracotta backdrop-blur"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Entreprise de rénovation Île-de-France
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            T<span className="text-terracotta">2</span>SR transforme vos espaces avec des travaux propres, modernes et durables
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            Placo, peinture, décoration et installation de cuisine pour particuliers et professionnels en Île-de-France.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <ButtonLink to="/contact" showArrow>Demander un devis gratuit</ButtonLink>
            <ButtonLink to="/services" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white hover:text-ink">
              Découvrir nos services
            </ButtonLink>
          </motion.div>
          <motion.ul
            className="mt-10 grid gap-3 text-sm font-bold text-white/82"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            {proofs.map((proof) => (
              <li key={proof} className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-terracotta" aria-hidden="true" />
                {proof}
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
