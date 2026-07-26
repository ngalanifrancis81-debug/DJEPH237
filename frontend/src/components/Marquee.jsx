import React from "react";
import { useLang } from "@/i18n/LanguageContext";

// Slow editorial ribbon. Duplicated content for a seamless CSS loop.
export default function Marquee() {
  const { t } = useLang();
  const words = t.marquee;
  const loop = [...words, ...words];

  return (
    <div
      className="relative overflow-hidden border-y border-brand/15 bg-brand py-6 select-none"
      data-testid="values-marquee"
    >
      <div className="marquee-track">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white px-8">
              {w}
            </span>
            <span className="text-white/50 text-2xl md:text-4xl">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
