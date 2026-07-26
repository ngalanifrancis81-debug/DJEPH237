import React from "react";
import { Link } from "react-router-dom";
import { MapPin, User, HandCoins, CalendarRange, HelpCircle, ArrowRight } from "lucide-react";
import CategoryBadge from "@/components/CategoryBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProjectCard({ p }) {
  return (
    <article
      className="hover-lift card-shadow group flex flex-col overflow-hidden rounded-3xl bg-white border border-ink/5"
      data-testid={`project-card-${p.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {p.categories.map((c) => <CategoryBadge key={c} code={c} />)}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-ink">
          <CalendarRange className="w-3.5 h-3.5 text-brand" /> {p.duration}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-bold text-lg leading-snug text-ink">
          <span className="text-brand">{p.flag} {p.country}</span> — {p.title}
        </h3>

        <div className="mt-3 space-y-1.5 text-sm text-ink/70">
          <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand shrink-0" /> {p.city}</p>
          <p className="flex items-center gap-2"><User className="w-4 h-4 text-brand shrink-0" /> {p.age_label}</p>
          <p className="flex items-center gap-2">
            <HandCoins className="w-4 h-4 text-brand shrink-0" /> Don de solidarité : {p.amount.toFixed(0)} EUR
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label="À quoi sert le don ?" data-testid={`don-info-${p.slug}`}><HelpCircle className="w-4 h-4 text-ink/40 hover:text-brand" /></button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px] text-xs">
                  Le don finance l'hébergement, l'encadrement local, le matériel du projet et le suivi sur le terrain.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>

        <p className="mt-3 text-sm text-ink/60 line-clamp-3 flex-1">{p.description}</p>

        <Link
          to={`/projet/${p.slug}`}
          data-testid={`project-details-${p.slug}`}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white font-bold px-6 py-3.5 transition-colors"
        >
          Voir les détails du projet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
