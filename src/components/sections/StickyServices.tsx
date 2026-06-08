import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/data/services";
import { Container } from "@/components/ui/Container";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export function StickyServices() {
  return (
    <section className="relative hidden bg-soft lg:block" data-section="sticky-services">
      <div className="grid grid-cols-[0.82fr_1.18fr]">
        <div className="sticky top-0 flex h-screen items-center">
          <Container className="max-w-none pl-[max(2rem,calc((100vw-80rem)/2))] pr-10">
            <div className="max-w-xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Services</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-6xl">
                Des services qui s’empilent au rythme de votre scroll
              </h2>
              <p className="mt-5 text-lg leading-8 text-copy">
                Une lecture premium des prestations T2SR : placo, peinture, décoration, cuisine et rénovation pour tous vos espaces.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-copy">
                <motion.span
                  className="grid size-10 place-items-center rounded-full border border-ink/15 text-terracotta"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="size-5" aria-hidden="true" />
                </motion.span>
                Faites défiler
              </div>
            </div>
          </Container>
        </div>
        <ScrollStack
          useWindowScroll
          itemDistance={90}
          itemScale={0.025}
          itemStackDistance={34}
          stackPosition="18%"
          scaleEndPosition="9%"
          baseScale={0.82}
          rotationAmount={0.35}
          blurAmount={0.4}
        >
          {SERVICES.map((service) => (
            <ScrollStackItem key={service.slug}>
              <ServiceMotionCard service={service} stack />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

export function MobileServices() {
  return (
    <section className="bg-soft py-20 lg:hidden">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Services</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink">
            Des services pour rénover proprement vos espaces
          </h2>
        </div>
        <div className="mt-10 grid gap-5">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <ServiceMotionCard service={service} compact />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceMotionCard({
  service,
  compact = false,
  stack = false,
}: {
  service: (typeof SERVICES)[number];
  compact?: boolean;
  stack?: boolean;
}) {
  return (
    <Link
      to={service.href}
      className={[
        "group relative block overflow-hidden rounded-xl border border-ink/8 bg-white shadow-xl shadow-ink/8 transition duration-300 hover:-translate-y-2 hover:border-terracotta hover:shadow-premium",
        compact ? "min-h-0 p-5" : stack ? "h-full p-8" : "h-[24rem] w-[27rem] p-7",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-56 overflow-hidden rounded-t-xl">
        <div
          className="size-full bg-cover bg-center transition duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${service.image}')` }}
          aria-hidden="true"
        />
      </div>
      <div className="relative mt-[13rem]">
        <h3 className="font-display text-3xl font-black text-ink">{service.title}</h3>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-copy">{service.shortText}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-terracotta">
          Voir le service <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
