import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export function ServiceMotionCardProxy({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link to={service.href} className="group overflow-hidden rounded-xl border border-ink/8 bg-white p-6 shadow-lg shadow-ink/8 transition duration-300 hover:-translate-y-2 hover:border-terracotta hover:shadow-premium">
      <img src={service.image} alt={service.title} className="-mx-6 -mt-6 h-32 w-[calc(100%+3rem)] object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      <div className="mt-6 grid size-14 place-items-center rounded-xl bg-terracotta text-white">
        <Icon className="size-7" aria-hidden="true" />
      </div>
      <h2 className="mt-6 font-display text-2xl font-black text-ink">{service.title}</h2>
      <p className="mt-4 leading-7 text-copy">{service.shortText}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-terracotta">
        Voir le service <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
