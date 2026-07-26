import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, GraduationCap, ArrowRight, Languages } from "lucide-react";
import { getCountries } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";

const HERO = "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1400&q=80";

export default function CoursesHome() {
  useSeo(
    "Cours de langues locales africaines | Widad International Volunteers",
    "Apprenez une langue locale en immersion : Ewondo, Bambara, Wolof, Yoruba, Darija, Mooré, Haoussa et plus, dans 8 pays d'Afrique."
  );
  const [countries, setCountries] = useState(null);

  useEffect(() => { getCountries().then((d) => setCountries(d.countries)).catch(() => setCountries([])); }, []);

  return (
    <main className="pt-24 pb-24 min-h-screen bg-secondary" data-testid="courses-home-page">
      <section className="relative overflow-hidden">
        <img src={HERO} alt="Cours de langue en petit groupe" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-indigo-700/70" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold"><Languages className="w-4 h-4" /> Immersion linguistique</span>
          <h1 className="mt-5 font-display font-extrabold text-4xl md:text-6xl tracking-tight max-w-3xl">Cours de langues locales</h1>
          <p className="mt-4 text-white/85 text-lg max-w-2xl">Choisis un pays et apprends sa langue maternelle sur place, en petit groupe et en immersion. Sessions à durée déterminée.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-display font-extrabold text-ink text-3xl tracking-tight">Choisis un pays</h2>
        {!countries ? (
          <div className="py-20 grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link to={`/cours/pays/${c.slug}`} data-testid={`course-country-${c.slug}`}
                  className="hover-lift card-shadow group flex items-center justify-between rounded-3xl bg-white border border-ink/5 p-6">
                  <div>
                    <div className="text-3xl">{c.flag}</div>
                    <div className="mt-2 font-display font-bold text-lg text-ink">{c.name}</div>
                    <div className="text-sm text-ink/50">{c.course_count} cours de langue</div>
                  </div>
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><ArrowRight className="w-5 h-5" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
