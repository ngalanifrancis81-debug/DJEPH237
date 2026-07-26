import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, ChevronRight, ArrowLeft } from "lucide-react";
import { getCourses } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";
import CourseCard from "@/components/CourseCard";

export default function CountryCourses() {
  const { countrySlug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCourses(countrySlug).then(setData).catch(() => setData({ courses: [], country: null })).finally(() => setLoading(false));
  }, [countrySlug]);

  const country = data?.country;
  useSeo(
    country ? `Cours de langue au ${country.name} | WIV` : "Cours de langue | WIV",
    country ? `Apprenez les langues locales du ${country.name} en immersion avec Widad International Volunteers.` : ""
  );

  return (
    <main className="pt-28 pb-24 min-h-screen bg-secondary" data-testid="country-courses-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <nav className="flex items-center gap-2 text-sm text-ink/50 font-semibold">
          <Link to="/" className="hover:text-brand">Accueil</Link><ChevronRight className="w-4 h-4" />
          <Link to="/cours" className="hover:text-brand">Cours de langue</Link><ChevronRight className="w-4 h-4" />
          <span className="text-ink">{country ? `${country.flag} ${country.name}` : countrySlug}</span>
        </nav>

        <Reveal>
          <h1 className="mt-4 font-display font-extrabold text-ink text-4xl md:text-5xl tracking-tight">
            {country ? <>Cours de langue au <span className="text-indigo-600">{country.flag} {country.name}</span></> : "Cours de langue"}
          </h1>
          <p className="mt-3 text-ink/60 text-lg">Apprends une langue maternelle locale en immersion, en petit groupe.</p>
        </Reveal>

        {loading ? (
          <div className="py-24 grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.courses.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}><CourseCard c={c} /></Reveal>
            ))}
          </div>
        )}

        <Link to="/cours" className="mt-12 inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Tous les pays
        </Link>
      </div>
    </main>
  );
}
