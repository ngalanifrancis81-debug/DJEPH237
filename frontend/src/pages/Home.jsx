import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import ProgramsGrid from "@/components/ProgramsGrid";
import Roadmap from "@/components/Roadmap";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageContext";

export default function Home() {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const scroll = () => {
        const el = document.getElementById(target);
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
        else el.scrollIntoView({ behavior: "smooth" });
      };
      const id = setTimeout(scroll, 250);
      return () => clearTimeout(id);
    }
  }, [location.state]);

  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <Manifesto />
      <ProgramsGrid />
      <Roadmap />

      {/* Donation CTA band */}
      <section className="relative z-10 bg-white py-20 md:py-28" data-testid="home-donate-cta">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-14 md:px-16 md:py-20 text-white">
              <div className="pointer-events-none absolute -top-16 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
              <div className="relative max-w-2xl">
                <h2 className="font-display font-semibold tracking-tight text-3xl md:text-5xl leading-[1.1]">
                  {t.donation.title}
                </h2>
                <p className="mt-5 text-white/80 text-lg leading-relaxed">{t.donation.subtitle}</p>
                <Link
                  to="/don"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-brand hover:bg-brand-light px-8 py-4 font-medium transition-colors"
                  data-testid="cta-band-donate-btn"
                >
                  <Heart className="w-4 h-4" /> {t.nav.donate} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
