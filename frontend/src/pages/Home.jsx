import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, GraduationCap, ArrowRight, HeartHandshake, Sprout, Languages } from "lucide-react";
import { getCountries } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";

const FALLBACK = [
  { slug: "cameroun", name: "Cameroun", flag: "🇨🇲" }, { slug: "mali", name: "Mali", flag: "🇲🇱" },
  { slug: "nigeria", name: "Nigeria", flag: "🇳🇬" }, { slug: "senegal", name: "Sénégal", flag: "🇸🇳" },
  { slug: "maroc", name: "Maroc", flag: "🇲🇦" }, { slug: "benin", name: "Bénin", flag: "🇧🇯" },
  { slug: "burkina-faso", name: "Burkina Faso", flag: "🇧🇫" }, { slug: "niger", name: "Niger", flag: "🇳🇪" },
];
const HERO_FALLBACK = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  useSeo(
    "Widad International Volunteers | Trouve ton projet de volontariat en Afrique",
    "Rejoins des projets de volontariat et d'entrepreneuriat solidaire au Cameroun, Mali, Nigeria, Sénégal, Maroc, Bénin, Burkina Faso et Niger. Apprends aussi les langues locales sur place."
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [countries, setCountries] = useState(FALLBACK);
  const [hero, setHero] = useState(HERO_FALLBACK);
  const [q, setQ] = useState("");

  useEffect(() => {
    getCountries().then((d) => { setCountries(d.countries); if (d.hero_image) setHero(d.hero_image); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === "recherche") {
      const el = document.getElementById("recherche");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(s));
  }, [q, countries]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (matches.length >= 1 && q.trim()) navigate(`/pays/${matches[0].slug}`);
  };

  return (
    <main data-testid="home-page">
      {/* HERO */}
      <section id="recherche" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={hero} alt="Paysage africain au coucher du soleil" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/70" />

        {/* Vertical brand rail */}
        <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-14 bg-brand items-center justify-center z-20">
          <span className="vertical-rail font-display font-bold text-white text-sm uppercase">Rechercher un projet</span>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-20">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-bold text-white border border-white/20">
            <HeartHandshake className="w-4 h-4" /> ONG de volontariat solidaire en Afrique
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Trouve ton projet <span className="text-gold">en Afrique</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-white/85 text-lg max-w-xl mx-auto">
            Viens participer concrètement à des projets de terrain, ou apprends une langue locale sur place.
          </motion.p>

          {/* Pills grid — 3x3 primary selector */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 mx-auto max-w-2xl grid grid-cols-3 gap-2.5 sm:gap-3 p-3 rounded-3xl bg-white/10 backdrop-blur border border-white/15">
            {matches.slice(0, 8).map((c) => (
              <Link key={c.slug} to={`/pays/${c.slug}`} data-testid={`pill-${c.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/95 hover:bg-white text-ink font-bold text-sm sm:text-base px-4 py-3 sm:py-3.5 transition-all hover:-translate-y-0.5 shadow-lg">
                <span className="text-lg">{c.flag}</span> {c.name}
              </Link>
            ))}
            <Link to="/cours" data-testid="pill-cours"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold hover:brightness-105 text-ink font-extrabold text-sm sm:text-base px-4 py-3 sm:py-3.5 transition-all hover:-translate-y-0.5 shadow-lg ring-2 ring-white/50">
              <span className="font-display text-lg">Aa</span> Cours de langue
            </Link>
          </motion.div>

          {/* Search — secondary quick filter, below the pills */}
          <motion.form onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 search-glow flex items-center gap-2 bg-white rounded-full border-2 border-transparent p-2 pl-5 max-w-md mx-auto transition">
            <Search className="w-5 h-5 text-ink/40 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Dans quel pays veux-tu t'engager ?"
              data-testid="search-input"
              className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink/40 py-2 min-w-0"
            />
            <button type="submit" data-testid="search-submit" className="rounded-full bg-brand hover:bg-brand-hover text-white font-bold px-5 py-2.5 transition-colors text-sm">
              Aller
            </button>
          </motion.form>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal><h2 className="font-display font-extrabold text-ink text-3xl md:text-4xl tracking-tight">Comment ça marche ?</h2></Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { icon: Search, t: "1. Choisis un pays", d: "Parcours les projets disponibles dans 8 pays d'Afrique, ou choisis un cours de langue locale." },
              { icon: Sprout, t: "2. Découvre le projet", d: "Dates, ville, tranche d'âge, don de solidarité et description détaillée de chaque mission." },
              { icon: ArrowRight, t: "3. Inscris-toi & pars", d: "Candidate en ligne, verse ton don de solidarité en toute sécurité, et rejoins l'aventure." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1}>
                <div className="rounded-3xl border border-ink/5 card-shadow p-7 h-full">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-light text-brand"><s.icon className="w-6 h-6" /></span>
                  <h3 className="mt-5 font-display font-bold text-xl text-ink">{s.t}</h3>
                  <p className="mt-2 text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES BAND */}
      <section className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-indigo-600 text-white px-8 py-12 md:px-14 md:py-16">
              <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold"><Languages className="w-4 h-4" /> Immersion linguistique</span>
                <h2 className="mt-5 font-display font-extrabold text-3xl md:text-4xl tracking-tight">Apprends une langue locale sur place</h2>
                <p className="mt-4 text-white/85 text-lg">Ewondo, Bambara, Wolof, Yoruba, Darija, Mooré… 24 cours dans 8 pays, en immersion.</p>
                <Link to="/cours" data-testid="courses-cta" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-7 py-3.5 transition-colors">
                  <GraduationCap className="w-5 h-5" /> Voir les cours de langue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
