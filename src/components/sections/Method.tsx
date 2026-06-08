import { PROCESS_STEPS } from "@/data/services";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp", "Home", "End"]);

export function Method() {
  const stepperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepperRef, { once: true, margin: "-20% 0px" });
  const [activeStep, setActiveStep] = useState(-1);
  const lockedRef = useRef(false);

  const preventScroll = useCallback((e: Event) => {
    if (lockedRef.current) e.preventDefault();
  }, []);

  const preventKeys = useCallback((e: KeyboardEvent) => {
    if (lockedRef.current && SCROLL_KEYS.has(e.key)) e.preventDefault();
  }, []);

  const lockScroll = useCallback(() => {
    lockedRef.current = true;
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });
  }, [preventScroll, preventKeys]);

  const unlockScroll = useCallback(() => {
    lockedRef.current = false;
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventKeys);
  }, [preventScroll, preventKeys]);

  useEffect(() => {
    if (!isInView) return;

    // Scroll the section into a comfortable view before locking
    stepperRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    // Small delay to let scrollIntoView settle, then lock
    const lockTimer = setTimeout(() => {
      lockScroll();

      let current = 0;
      const interval = setInterval(() => {
        setActiveStep(current);
        current++;
        if (current >= PROCESS_STEPS.length) {
          clearInterval(interval);
          // Unlock after the last step's animation finishes
          setTimeout(unlockScroll, 500);
        }
      }, 600);
    }, 400);

    return () => {
      clearTimeout(lockTimer);
      unlockScroll();
    };
  }, [isInView, lockScroll, unlockScroll]);

  const lineProgress = Math.max(0, activeStep) / (PROCESS_STEPS.length - 1);

  return (
    <Section className="bg-white">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Notre méthode</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Un processus simple, du premier échange à la livraison
          </h2>
        </Reveal>

        {/* Stepper */}
        <div ref={stepperRef} className="mt-14">
          <div className="relative mx-auto max-w-4xl">
            {/* Background line */}
            <div className="absolute top-[1.375rem] left-[10%] hidden h-0.5 w-[80%] bg-ink/10 md:block" />

            {/* Animated fill line */}
            <motion.div
              className="absolute top-[1.375rem] left-[10%] hidden h-0.5 origin-left bg-terracotta md:block"
              style={{ width: "80%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: lineProgress }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <ol className="relative flex flex-col items-start gap-6 md:flex-row md:gap-0">
              {PROCESS_STEPS.map((step, index) => {
                const isActive = index <= activeStep;

                return (
                  <li
                    key={step}
                    className="flex flex-1 items-start gap-3 md:flex-col md:items-center md:gap-0"
                  >
                    {/* Numbered circle */}
                    <motion.span
                      className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full font-display text-lg font-black transition-colors duration-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isActive
                          ? { scale: 1, opacity: 1, backgroundColor: "#e67e22", color: "#ffffff" }
                          : isInView
                            ? { scale: 1, opacity: 1, backgroundColor: "#e5e7eb", color: "#9ca3af" }
                            : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.3 },
                        backgroundColor: { duration: 0.4 },
                        color: { duration: 0.4 },
                      }}
                    >
                      {index + 1}
                    </motion.span>

                    {/* Label */}
                    <motion.h3
                      className="font-display text-base font-bold leading-tight md:mt-4 md:text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0, color: "#1f2a37" }
                          : isInView
                            ? { opacity: 0.4, y: 0, color: "#9ca3af" }
                            : { opacity: 0, y: 8 }
                      }
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {step}
                    </motion.h3>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
