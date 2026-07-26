import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const lineWrap = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const lineChild = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToPrograms = () => {
    const el = document.getElementById("programs");
    if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -90 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="top" className="relative min-h-screen pt-32 pb-16 overflow-hidden" data-testid="hero-section">
      {/* Blue depth blocks */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[38rem] h-[38rem] rounded-full bg-brand-light blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light/60 px-4 py-1.5 text-sm font-medium text-brand-dark"
          >
            <Sparkles className="w-4 h-4" /> {t.hero.badge}
          </motion.div>

          <motion.h1
            variants={lineWrap}
            initial="hidden"
            animate="show"
            className="mt-6 font-display font-semibold tracking-tighter text-ink text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.04]"
          >
            {t.hero.slogan.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span variants={lineChild} className={`block ${i === t.hero.slogan.length - 1 ? "text-brand" : ""}`}>
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 max-w-xl text-base md:text-lg text-slate-600 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToPrograms}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-8 py-4 font-medium transition-colors"
              data-testid="hero-programs-btn"
            >
              {t.hero.ctaPrograms} <ArrowDown className="w-4 h-4" />
            </button>
            <Link
              to="/don"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink border border-gray-200 hover:border-brand hover:text-brand px-8 py-4 font-medium transition-colors"
              data-testid="hero-donate-btn"
            >
              <Heart className="w-4 h-4" /> {t.hero.ctaDonate}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-semibold text-ink">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Clipped, spotlighted photography with parallax */}
        <div className="lg:col-span-5">
          <motion.div style={{ opacity: fade }} className="relative">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[2rem] overflow-hidden border border-brand/10 shadow-2xl shadow-brand/10 aspect-[4/5]"
            >
              <motion.img
                style={{ y: imgY, scale: imgScale }}
                src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1000&q=80"
                alt="Jeunes créateurs en atelier tech et solaire"
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl border border-white/60 shadow-xl px-5 py-4 max-w-[13rem]"
            >
              <div className="text-sm font-medium text-ink">Cameroun · Solar & Tech</div>
              <div className="text-xs text-slate-500 mt-1">Makerspace mobile alimenté 100% énergie solaire.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
