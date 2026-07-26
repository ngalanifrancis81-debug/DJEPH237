import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, ChevronRight, ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function CountryProjects() {
  const { countrySlug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects(countrySlug).then(setData).catch(() => setData({ projects: [], country: null })).finally(() => setLoading(false));
  }, [countrySlug]);

  const country = data?.country;
  useSeo(
    country ? `Projets de volontariat au ${country.name} | Widad International Volunteers` : "Projets de volontariat | WIV",
    country ? `Découvrez les projets de volontariat solidaire disponibles au ${country.name} : éducation, environnement, entrepreneuriat, santé.` : ""
  );

  return (
    <main className="pt-28 pb-24 min-h-screen bg-secondary" data-testid="country-projects-page">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <nav className="flex items-center gap-2 text-sm text-ink/50 font-semibold">
          <Link to="/" className="hover:text-brand">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ink">{country ? `${country.flag} ${country.name}` : countrySlug}</span>
        </nav>

        <Reveal>
          <h1 className="mt-4 font-display font-extrabold text-ink text-4xl md:text-5xl tracking-tight">
            {country ? <>Projets au <span className="text-brand">{country.flag} {country.name}</span></> : "Projets"}
          </h1>
          <p className="mt-3 text-ink/60 text-lg">Choisis une mission de terrain à durée déterminée et engage-toi concrètement.</p>
        </Reveal>

        {loading ? (
          <div className="py-24 grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-brand" /></div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}><ProjectCard p={p} /></Reveal>
            ))}
          </div>
        )}

        <Link to="/" className="mt-12 inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Retour à la recherche
        </Link>
      </div>
    </main>
  );
}
