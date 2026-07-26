import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin, Loader2, Send, Instagram, Facebook, Linkedin } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { NGO_EMAIL, LOCATION, mailtoLink, whatsappLink } from "@/lib/contact";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const valid =
    form.name.trim() && form.subject.trim() && form.message.trim() &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) {
      toast.error(c.error);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(c.success);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(c.error);
    } finally {
      setLoading(false);
    }
  };

  const socials = [Instagram, Facebook, Linkedin];

  return (
    <main className="pt-28 pb-24 min-h-screen bg-white" data-testid="contact-page">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="text-sm uppercase tracking-widest text-brand font-medium">{c.kicker}</span>
          <h1 className="mt-4 font-display font-semibold tracking-tight text-ink text-4xl md:text-5xl leading-[1.1] max-w-3xl">
            {c.title}
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl">{c.intro}</p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <form onSubmit={submit} className="rounded-[1.75rem] border border-brand/10 bg-secondary p-7 md:p-10" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <input value={form.name} onChange={set("name")} placeholder={c.name} data-testid="contact-name"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition" />
                <input type="email" value={form.email} onChange={set("email")} placeholder={c.email} data-testid="contact-email"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition" />
              </div>
              <input value={form.subject} onChange={set("subject")} placeholder={c.subject} data-testid="contact-subject"
                className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition" />
              <textarea value={form.message} onChange={set("message")} placeholder={c.message} rows={6} data-testid="contact-message"
                className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition resize-none" />
              <button type="submit" disabled={loading} data-testid="contact-submit"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-8 py-4 font-medium transition-colors">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? c.sending : c.send}
              </button>
            </form>
          </Reveal>

          {/* Direct */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="rounded-[1.75rem] border border-brand/10 bg-ink text-white p-7 md:p-10">
              <h2 className="font-display text-xl font-medium">{c.directTitle}</h2>
              <div className="mt-6 flex flex-col gap-3">
                <a href={mailtoLink("WIV", lang)} data-testid="contact-direct-email"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink hover:bg-brand-light px-6 py-4 font-medium transition-colors">
                  <Mail className="w-4 h-4" /> {t.contactButtons.email}
                </a>
                <a href={whatsappLink("WIV", lang)} target="_blank" rel="noopener noreferrer" data-testid="contact-direct-whatsapp"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-wa hover:bg-wa-dark text-white px-6 py-4 font-medium transition-colors">
                  <MessageCircle className="w-4 h-4" /> {t.contactButtons.whatsapp}
                </a>
              </div>

              <div className="mt-8 space-y-3 text-white/75 text-sm">
                <p className="flex items-center gap-2 break-all"><Mail className="w-4 h-4 shrink-0" /> {NGO_EMAIL}</p>
                <p className="flex items-center gap-2"><MessageCircle className="w-4 h-4 shrink-0" /> +237 677 958 119</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0 text-brand-light" /> {c.locationLabel}: {LOCATION}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-white/50 mb-3">{c.social}</p>
                <div className="flex gap-3">
                  {socials.map((Icon, i) => (
                    <span key={i} title={c.soon} className="grid place-items-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-brand-light hover:border-brand-light/40 transition-colors cursor-pointer">
                      <Icon className="w-5 h-5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
