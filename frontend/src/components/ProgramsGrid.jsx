import React from "react";
import { Wrench, Sprout, Tent } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";
import ContactButtons from "@/components/ContactButtons";

const ICONS = { Wrench, Sprout, Tent };
const IMAGES = {
  makerspace: "https://images.unsplash.com/photo-1694175271713-a6e2cc378980?auto=format&fit=crop&w=900&q=80",
  incubator: "https://images.unsplash.com/photo-1734254807102-fbf62b0cc513?auto=format&fit=crop&w=900&q=80",
  coliving: "https://images.unsplash.com/photo-1620464225966-8482645f2db1?auto=format&fit=crop&w=900&q=80",
};

function ProgramBlock({ item, index }) {
  const Icon = ICONS[item.icon] || Wrench;
  const reversed = index % 2 === 1;

  return (
    <div id={item.id} className="scroll-mt-28" data-testid={`program-${item.id}`}>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Media */}
        <Reveal className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
          <div className="relative rounded-[1.75rem] overflow-hidden border border-brand/10 shadow-xl shadow-brand/5 aspect-[4/5] lg:sticky lg:top-28">
            <img
              src={IMAGES[item.id]}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass border border-white/50 px-4 py-2 text-sm font-medium text-ink">
              {item.tag}
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
          <Reveal>
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand text-white">
              <Icon className="w-6 h-6" strokeWidth={2} />
            </span>
            <h3 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">{item.description}</p>
          </Reveal>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {item.sub.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="hover-lift h-full rounded-2xl border border-gray-100 bg-white p-6 flex flex-col">
                  <h4 className="font-display text-lg font-medium text-ink">{s.title}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{s.text}</p>
                  <div className="mt-5">
                    <ContactButtons program={s.name} testPrefix={`sub-${item.id}-${i}`} compact />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mandatory pair under the whole block */}
          <Reveal delay={0.1}>
            <div className="mt-6 rounded-2xl border border-brand/10 bg-brand-light/50 p-5">
              <ContactButtons program={item.name} testPrefix={`block-${item.id}`} />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsGrid() {
  const { t } = useLang();
  const s = t.spaces;

  return (
    <section id="programs" className="relative z-10 bg-secondary py-24 md:py-32 scroll-mt-24" data-testid="programs-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><span className="text-sm uppercase tracking-widest text-brand font-medium">{s.kicker}</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-ink text-4xl md:text-5xl leading-[1.1]">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-6 text-lg text-slate-600 leading-relaxed">{s.intro}</p></Reveal>
        </div>

        <div className="mt-16 space-y-20 md:space-y-28">
          {s.items.map((item, i) => (
            <ProgramBlock key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
