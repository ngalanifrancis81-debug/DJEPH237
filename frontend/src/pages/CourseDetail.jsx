import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ChevronRight, MapPin, User, Wallet, CalendarRange, MessageSquare, UserPlus, Languages, Clock } from "lucide-react";
import { getCourse } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { Reveal } from "@/components/Reveal";
import ContactButtons from "@/components/ContactButtons";
import CourseCard from "@/components/CourseCard";

export default function CourseDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    getCourse(slug).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [slug]);

  const c = data?.course;
  useSeo(c ? `${c.title} | WIV` : "Cours | WIV", c ? c.description.slice(0, 155) : "");

  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
  if (!c) return <div className="min-h-screen grid place-items-center pt-20"><p className="text-ink/60">Cours introuvable. <Link to="/cours" className="text-indigo-600 font-bold">Retour</Link></p></div>;

  return (
    <main className="pt-24 pb-24 min-h-screen bg-white" data-testid="course-detail-page">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/50 font-semibold py-4">
          <Link to="/" className="hover:text-brand">Accueil</Link><ChevronRight className="w-4 h-4" />
          <Link to="/cours" className="hover:text-brand">Cours de langue</Link><ChevronRight className="w-4 h-4" />
          <Link to={`/cours/pays/${c.country_slug}`} className="hover:text-brand">{c.flag} {c.country}</Link><ChevronRight className="w-4 h-4" />
          <span className="text-ink truncate max-w-[40vw]">{c.language}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="relative rounded-[1.75rem] overflow-hidden card-shadow aspect-[16/11]">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 inset-x-0 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-xs font-extrabold tracking-wide">
                <Languages className="w-4 h-4" /> LANGUAGE LEARNING
              </div>
            </motion.div>

            <Reveal>
              <h2 className="mt-8 font-display font-bold text-2xl text-ink">Présentation</h2>
              <p className="mt-3 text-ink/70 text-lg leading-relaxed">{c.description}</p>

              <h2 className="mt-8 font-display font-bold text-2xl text-ink">Programme détaillé</h2>
              <ol className="mt-4 space-y-3">
                {c.schedule.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                    <span className="grid place-items-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold shrink-0"><Clock className="w-4 h-4" /></span>
                    <span className="text-ink/75">{line}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-[1.75rem] border border-ink/10 card-shadow p-7 bg-white">
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink leading-tight">
                <span className="text-brand">{c.flag} {c.country}</span><br />Cours de {c.language}
              </h1>
              <div className="mt-5 space-y-3 text-ink/75">
                <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-indigo-600 shrink-0" /> {c.city}</p>
                <p className="flex items-center gap-3"><CalendarRange className="w-5 h-5 text-indigo-600 shrink-0" /> {c.session}</p>
                <p className="flex items-center gap-3"><User className="w-5 h-5 text-indigo-600 shrink-0" /> {c.age_label}</p>
                <p className="flex items-center gap-3"><MessageSquare className="w-5 h-5 text-indigo-600 shrink-0" /> {c.teaching}</p>
                <p className="flex items-center gap-3"><Wallet className="w-5 h-5 text-indigo-600 shrink-0" /> Frais de cours : <strong>{c.amount.toFixed(0)} EUR</strong></p>
              </div>
              <div className="mt-7 space-y-3">
                <Link to={`/inscription/cours/${c.slug}`} data-testid="course-register-btn"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-4 transition-colors">
                  <UserPlus className="w-5 h-5" /> Inscrivez-vous à ce cours
                </Link>
                <ContactButtons title={c.title} testPrefix="course" />
              </div>
            </div>
          </div>
        </div>

        {data.related?.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-2xl text-ink">Autres cours au {c.country}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {data.related.map((r) => <CourseCard key={r.slug} c={r} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
