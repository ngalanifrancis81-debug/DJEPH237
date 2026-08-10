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

      {/* BIOGRAPHY / MANIFESTO */}
      <section id="bio" className="relative z-10 bg-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-sm uppercase tracking-widest text-brand font-bold">Widad International Volunteers</span>
            <h2 className="mt-4 font-display font-extrabold text-ink text-4xl md:text-5xl leading-[1.1] tracking-tight">
              Un volontariat responsable, humain, et tourné vers l'avenir.
            </h2>
          </Reveal>

          {[
            {
              n: "01",
              t: "Une histoire du volontariat dans le monde",
              ps: [
                "Le volontariat organisé, tel que nous le connaissons aujourd'hui, trouve l'une de ses origines les plus marquantes au XIXᵉ siècle. En 1859, un citoyen suisse témoin des ravages d'une grande bataille européenne est bouleversé par l'absence de secours organisés pour les blessés. De ce constat naît, en 1863, la création d'un mouvement international de secours volontaire et désintéressé, fondé sur l'idée que des civils peuvent s'organiser librement pour venir en aide à autrui, sans distinction d'origine.",
                "À la même époque, une infirmière britannique s'illustre par son rôle pionnier dans l'organisation de soins bénévoles pendant un conflit majeur en Crimée. Son action contribue à poser les bases d'un volontariat structuré, formé et encadré, loin de l'improvisation, et inspire par la suite la formation de nombreuses volontaires à travers l'Europe.",
                "Au XXᵉ siècle, le volontariat prend une dimension internationale et institutionnelle. En 1961, un jeune président américain lance un programme invitant des volontaires à s'engager plusieurs années à l'étranger pour appuyer des projets de développement communautaire, d'éducation et de santé. Cette initiative marque un tournant : le volontariat devient un outil reconnu de coopération entre les peuples, encouragé au plus haut niveau politique.",
                "Depuis, le mouvement s'est amplifié et diversifié à l'échelle mondiale, porté par des organisations locales et internationales, des programmes des Nations Unies dédiés au volontariat, et des millions de citoyens convaincus qu'un engagement individuel, aussi modeste soit-il, peut contribuer à un changement collectif. C'est dans cet héritage que s'inscrit Widad International Volunteers : perpétuer cette tradition d'engagement solidaire, en l'adaptant aux réalités et aux besoins d'aujourd'hui.",
              ],
            },
            {
              n: "02",
              t: "Notre raison d'être",
              ps: [
                "Widad International Volunteers est une organisation non gouvernementale dédiée au volontariat international solidaire. Née de la conviction qu'un engagement humain, lorsqu'il est bien pensé et bien accompagné, peut transformer aussi bien les territoires qui l'accueillent que les personnes qui s'y consacrent, notre organisation s'attache à créer des ponts durables entre des volontaires venus d'horizons divers et des communautés confrontées à des défis concrets du quotidien.",
                "Nous ne concevons pas le volontariat comme un simple séjour à l'étranger, ni comme une parenthèse touristique teintée de bonnes intentions. Nous le pensons comme un véritable engagement, structuré, encadré et évalué, où chaque volontaire devient un acteur temporaire mais essentiel d'un projet plus large qui le dépasse et qui continue d'exister après son départ.",
              ],
            },
            {
              n: "03",
              t: "Notre vision du volontariat solidaire",
              ps: [
                "Trop souvent, le volontariat international souffre d'un déséquilibre : des volontaires enthousiastes mais mal préparés, des projets improvisés, un impact réel difficile à mesurer, voire une forme de dépendance créée plutôt que d'autonomie transmise. Chez Widad, nous avons fait le choix inverse. Chaque mission que nous proposons répond à un besoin exprimé, documenté et validé par les acteurs locaux eux-mêmes : associations de terrain, structures communautaires, établissements éducatifs, coopératives ou centres sociaux. Ce sont eux qui définissent la nature du besoin ; nous nous assurons ensuite que les compétences, l'énergie et la motivation des volontaires viennent s'y greffer de manière cohérente, utile et respectueuse.",
                "Cette philosophie repose sur une conviction simple : le meilleur volontariat est celui qui se rend, à terme, invisible — celui qui transmet des compétences, renforce des capacités locales, et finit par ne plus être nécessaire, parce que les communautés concernées ont gagné en autonomie.",
              ],
            },
            {
              n: "04",
              t: "Notre méthode de travail",
              ps: [
                "Chaque mission proposée par Widad International Volunteers suit un processus rigoureux, de sa conception à son évaluation.",
                "En amont, nous identifions et validons chaque projet en concertation directe avec la structure locale partenaire, afin de nous assurer que le besoin exprimé est réel, précis et durable. Nous refusons les projets construits uniquement pour « occuper » des volontaires, sans réelle utilité pour la communauté.",
                "Pendant la mission, chaque volontaire bénéficie d'un encadrement local constant, assuré par des référents formés, présents sur place, capables de faire le lien entre les objectifs du projet, les attentes du volontaire et les réalités du terrain. Ce cadre garantit à la fois la sécurité, le bon déroulement de la mission et la qualité de l'expérience vécue.",
                "En aval, nous assurons un suivi de l'impact des actions menées, en évaluant dans quelle mesure les objectifs fixés ont été atteints, et en ajustant, si nécessaire, nos futures collaborations avec la structure partenaire concernée.",
              ],
            },
            {
              n: "05",
              t: "Notre engagement en matière de transparence",
              ps: [
                "La confiance est au cœur de notre fonctionnement, aussi bien vis-à-vis des volontaires que des communautés que nous accompagnons. Les contributions financières demandées aux volontaires, sous forme de dons de solidarité, sont intégralement affectées au financement des projets : hébergement, encadrement local, matériel, soutien direct aux structures partenaires. Aucune marge cachée, aucune ambiguïté sur l'utilisation des fonds : chaque volontaire sait précisément à quoi contribue son engagement.",
              ],
            },
            {
              n: "06",
              t: "L'expérience humaine et culturelle",
              ps: [
                "Au-delà de la dimension solidaire, l'engagement chez Widad est aussi, et peut-être avant tout, une expérience humaine profonde. Vivre au sein d'une communauté, partager son quotidien, comprendre ses codes, ses traditions et ses réalités, c'est acquérir un regard neuf sur le monde et sur soi-même. Nos volontaires repartent rarement inchangés : ils reviennent avec une compréhension plus fine des enjeux de développement, une plus grande capacité d'adaptation, et souvent, une remise en question salutaire de leurs propres certitudes.",
                "Nous croyons que cette dimension humaine et interculturelle est indissociable de l'impact solidaire : un volontaire qui comprend et respecte le contexte dans lequel il s'engage sera toujours plus utile qu'un volontaire animé des meilleures intentions mais déconnecté des réalités locales.",
              ],
            },
            {
              n: "07",
              t: "Notre ambition",
              ps: [
                "À travers chacune de ses actions, Widad International Volunteers poursuit une double ambition : contribuer de manière tangible, mesurable et durable au développement des communautés que nous accompagnons, et offrir à chaque volontaire une expérience transformatrice, exigeante et profondément humaine.",
                "Nous ne prétendons pas résoudre à nous seuls les défis auxquels sont confrontées les communautés que nous accompagnons. Mais nous croyons fermement qu'un engagement bien pensé, structuré et respectueux peut faire une réelle différence — pour ceux qui donnent de leur temps, comme pour ceux qui les accueillent.",
              ],
            },
          ].map((ch, i) => (
            <Reveal key={ch.n} delay={i * 0.03}>
              <div className="mt-14 grid md:grid-cols-12 gap-6 md:gap-10">
                <div className="md:col-span-3">
                  <div className="sticky md:top-28">
                    <div className="font-display font-extrabold text-brand text-5xl md:text-6xl leading-none">{ch.n}</div>
                    <h3 className="mt-3 font-display font-bold text-ink text-xl md:text-2xl leading-tight">{ch.t}</h3>
                  </div>
                </div>
                <div className="md:col-span-9 space-y-4">
                  {ch.ps.map((p, j) => (
                    <p key={j} className="text-ink/75 text-lg leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.05}>
            <p className="mt-16 pt-8 border-t border-ink/10 font-display font-bold text-brand text-xl md:text-2xl">
              Widad International Volunteers — un volontariat responsable, humain, et tourné vers l'avenir.
            </p>
          </Reveal>
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
