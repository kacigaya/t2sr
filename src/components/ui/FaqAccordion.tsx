import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/services";

export function FaqAccordion() {
  return (
    <Accordion.Root className="grid gap-3">
      {FAQS.map((item) => (
        <Accordion.Item
          key={item.question}
          className="rounded-xl border border-ink/10 bg-white shadow-sm"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-bold text-ink outline-none transition hover:text-terracotta focus-visible:ring-4 focus-visible:ring-terracotta/20">
              {item.question}
              <Plus className="size-5 shrink-0 transition group-data-[panel-open]:rotate-45" aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-copy transition-[height] duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0">
            <p className="px-6 pb-6 leading-7">{item.answer}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
