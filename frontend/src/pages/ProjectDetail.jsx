import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ChevronRight, MapPin, User, HandCoins, CalendarRange, UserPlus, Info } from "lucide-react";
import { getProject } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";
import CategoryBadge from "@/components/CategoryBadge";
import ContactButtons from "@/components/ContactButtons";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    getProject(slug).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [slug]);

  const p = data?.project;
  useSeo(
    p ? `${p.title} — ${p.country} | WIV` : "Projet | WIV",
    p ? p.description.slice(0, 155) : ""
  );

  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-brand" /></div>;
  if (!p) return <div className="min-h-screen grid place-items-center pt-20"><p className="text-ink/60">Projet introuvable. <Link to="/" className="text-brand font-bold">Retour</Link></p></div>;

  return (
    <main className="pt-24 pb-24 min-h-screen bg-white" data-testid="project-detail-page">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/50 font-semibold py-4">
          <Link to="/" className="hover:text-brand">Accueil</Link><ChevronRight className="w-4 h-4" />
          <Link to={`/pays/${p.country_slug}`} className="hover:text-brand">{p.flag} {p.country}</Link><ChevronRight className="w-4 h-4" />
          <span className="text-ink truncate max-w-[50vw]">{p.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="relative rounded-[1.75rem] overflow-hidden card-shadow aspect-[16/11]">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-1.5">{p.categories.map((c) => <CategoryBadge key={c} code={c} />)}</div>
            </motion.div>

            <Reveal>
              <h2 className="mt-8 font-display font-bold text-2xl text-ink">Le projet</h2>
              <p className="mt-3 text-ink/70 text-lg leading-relaxed">{p.description}</p>
              <div className="mt-5 flex items-start gap-2 rounded-2xl bg-brand-light/60 p-4 text-sm text-ink/70">
                <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <span>Le don de solidarité couvre l'hébergement, l'encadrement local, le matériel et le suivi du projet sur le terrain. Il ne s'agit pas d'un salaire mais d'une contribution qui rend la mission possible.</span>
              </div>
            </Reveal>
          </div>

          {/* Sticky action card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-[1.75rem] border border-ink/10 card-shadow p-7 bg-white">
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink leading-tight">
                <span className="text-brand">{p.flag} {p.country}</span><br />{p.title}
              </h1>
              <div className="mt-5 space-y-3 text-ink/75">
                <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-brand shrink-0" /> {p.city}</p>
                <p className="flex items-center gap-3"><CalendarRange className="w-5 h-5 text-brand shrink-0" /> Durée : {p.duration}</p>
                <p className="flex items-center gap-3"><User className="w-5 h-5 text-brand shrink-0" /> {p.age_label}</p>
                <p className="flex items-center gap-3"><HandCoins className="w-5 h-5 text-brand shrink-0" /> Don de solidarité : <strong>{p.amount.toFixed(0)} EUR</strong></p>
              </div>

              <div className="mt-7 space-y-3">
                <Link to={`/inscription/projet/${p.slug}`} data-testid="project-register-btn"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-extrabold px-6 py-4 transition-colors">
                  <UserPlus className="w-5 h-5" /> Inscrivez-vous pour participer au projet
                </Link>
                <ContactButtons title={p.title} testPrefix="project" />
              </div>
            </div>
          </div>
        </div>

        {data.related?.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-2xl text-ink">Autres projets au {p.country}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {data.related.map((r) => <ProjectCard key={r.slug} p={r} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
