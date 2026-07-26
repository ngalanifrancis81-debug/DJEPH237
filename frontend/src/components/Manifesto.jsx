import React from "react";
import { Users, Rocket, Leaf } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";

const ICONS = [Users, Rocket, Leaf];

export default function Manifesto() {
  const { t } = useLang();
  const e = t.esprit;

  return (
    <section id="esprit" className="relative z-10 bg-white py-24 md:py-32" data-testid="esprit-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-sm uppercase tracking-widest text-brand font-medium">{e.kicker}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-ink text-4xl md:text-5xl leading-[1.1]">
              {e.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">{e.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {e.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.n} delay={i * 0.12}>
                <div className="hover-lift relative overflow-hidden rounded-2xl border border-brand/10 bg-secondary p-8 h-full">
                  <span className="pointer-events-none absolute -top-6 right-2 font-display font-semibold text-[7rem] leading-none text-brand/[0.06] select-none">
                    {p.n}
                  </span>
                  <div className="relative z-10">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand text-white">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </span>
                    <h3 className="mt-6 font-display text-xl md:text-2xl font-medium tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
