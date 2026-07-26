import React from "react";
import { motion } from "framer-motion";
import { Rocket, Boxes, PartyPopper } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";

const ICONS = [Rocket, Boxes, PartyPopper];

export default function Roadmap() {
  const { t } = useLang();
  const r = t.roadmap;

  return (
    <section id="roadmap" className="relative z-10 bg-ink text-white py-24 md:py-32 overflow-hidden" data-testid="roadmap-section">
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><span className="text-sm uppercase tracking-widest text-brand-light font-medium">{r.kicker}</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-4xl md:text-5xl leading-[1.1]">{r.title}</h2>
          </Reveal>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-[27px] md:left-1/2 top-2 bottom-2 w-px bg-white/15 md:-translate-x-1/2" />
          <div className="space-y-12">
            {r.steps.map((step, i) => {
              const Icon = ICONS[i];
              const left = i % 2 === 0;
              return (
                <Reveal key={step.period} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Node */}
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.1 + 0.2 }}
                        className="grid place-items-center w-14 h-14 rounded-2xl bg-brand text-white shadow-lg shadow-brand/40"
                      >
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </motion.span>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 md:w-1/2 ${left ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:bg-white/[0.07] transition-colors">
                        <span className="inline-block rounded-full bg-brand-light/15 text-brand-light text-xs uppercase tracking-widest px-3 py-1 font-medium">
                          {step.period}
                        </span>
                        <h3 className="mt-4 font-display text-xl md:text-2xl font-medium">{step.title}</h3>
                        <p className="mt-3 text-white/60 leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
