import React from "react";
import { Link } from "react-router-dom";
import { MapPin, User, Wallet, CalendarRange, MessageSquare, ArrowRight, Languages } from "lucide-react";

export default function CourseCard({ c }) {
  return (
    <article
      className="hover-lift card-shadow group flex flex-col overflow-hidden rounded-3xl bg-white border border-ink/5"
      data-testid={`course-card-${c.slug}`}
    >
      <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 text-xs font-extrabold tracking-wide">
        <Languages className="w-4 h-4" /> LANGUAGE LEARNING
        <span className="ml-auto rounded bg-white/20 px-2 py-0.5">{c.age_min >= 18 ? "ADULT" : "TEEN"}</span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-ink">
          <CalendarRange className="w-3.5 h-3.5 text-indigo-600" /> {c.session}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-lg leading-snug text-ink">
          <span className="text-brand">{c.flag} {c.country}</span> : Cours de {c.language} à {c.city}
        </h3>

        <div className="mt-3 space-y-1.5 text-sm text-ink/70">
          <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-600 shrink-0" /> {c.city}</p>
          <p className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-600 shrink-0" /> {c.age_label}</p>
          <p className="flex items-center gap-2"><Wallet className="w-4 h-4 text-indigo-600 shrink-0" /> {c.amount.toFixed(0)} EUR</p>
          <p className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-600 shrink-0" /> {c.teaching}</p>
        </div>

        <p className="mt-3 text-sm text-ink/60 line-clamp-3 flex-1">{c.description}</p>

        <Link
          to={`/cours/detail/${c.slug}`}
          data-testid={`course-details-${c.slug}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 transition-colors"
        >
          Voir les détails du cours <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
