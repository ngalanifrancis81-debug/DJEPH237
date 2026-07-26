import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { Loader2, ChevronRight, CreditCard, ShieldCheck, Lock, Mail, MessageCircle, CheckCircle2, UserPlus } from "lucide-react";
import { getProject, getCourse, getConfig, createRegistration, createCheckout, API } from "@/lib/api";
import { useSeo } from "@/lib/useSeo";
import { mailtoRecall, whatsappInterest } from "@/lib/contact";
import axios from "axios";

const SESSIONS = ["Dès que possible", "Janvier – Mars", "Avril – Juin", "Juillet – Septembre", "Octobre – Décembre"];
const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function ageFrom(birthdate) {
  if (!birthdate) return null;
  const b = new Date(birthdate);
  if (isNaN(b)) return null;
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
  return a;
}

export default function Register() {
  const { kind, slug } = useParams(); // kind: projet | cours
  const apiKind = kind === "cours" ? "course" : "project";
  const isCourse = apiKind === "course";

  const [item, setItem] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [regId, setRegId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false);

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", country_residence: "",
    birthdate: "", session: SESSIONS[0], motivation: "", confirm_donation: false,
  });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  useEffect(() => {
    setLoading(true);
    const fetcher = isCourse ? getCourse(slug) : getProject(slug);
    Promise.all([fetcher, getConfig()])
      .then(([d, cfg]) => { setItem(isCourse ? d.course : d.project); setConfig(cfg); })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [slug, isCourse]);

  useSeo(item ? `Inscription — ${item.title} | WIV` : "Inscription | WIV", "");

  const fullName = `${form.first_name} ${form.last_name}`.trim();
  const feeLabel = isCourse ? "les frais de cours" : "le don de solidarité";

  const validate = () => {
    if (!form.first_name.trim() || !form.last_name.trim()) return "Merci d'indiquer votre nom et prénom.";
    if (!emailRe.test(form.email)) return "Adresse e-mail invalide.";
    if (form.phone.trim().length < 5) return "Numéro de téléphone invalide.";
    if (!form.country_residence.trim()) return "Indiquez votre pays de résidence.";
    const age = ageFrom(form.birthdate);
    if (age === null) return "Date de naissance invalide.";
    if (item.age_min && age < item.age_min) return `Ce programme est réservé aux ${item.age_min} ans et plus.`;
    if (item.age_max && age > item.age_max) return `Ce programme est réservé aux ${item.age_min}-${item.age_max} ans.`;
    if (!form.confirm_donation) return `Merci de confirmer pouvoir verser ${feeLabel} de ${item.amount.toFixed(0)} EUR.`;
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }
    setSubmitting(true);
    try {
      const res = await createRegistration({ kind: apiKind, slug, ...form });
      setRegId(res.id);
      setStep(2);
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
      toast.success("Candidature enregistrée ! Finalisez votre inscription.");
    } catch (e) {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const payStripe = async () => {
    setPaying(true);
    try {
      const d = await createCheckout({ kind: apiKind, slug, registration_id: regId, name: fullName, email: form.email, origin_url: window.location.origin });
      window.location.href = d.checkout_url;
    } catch (e) {
      setPaying(false);
      toast.error("Erreur lors de la création du paiement.");
    }
  };

  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="w-8 h-8 animate-spin text-brand" /></div>;
  if (!item) return <div className="min-h-screen grid place-items-center pt-20"><p className="text-ink/60">Programme introuvable. <Link to="/" className="text-brand font-bold">Retour</Link></p></div>;

  const accent = isCourse ? "indigo-600" : "brand";
  const detailLink = isCourse ? `/cours/detail/${slug}` : `/projet/${slug}`;

  return (
    <main className="pt-28 pb-24 min-h-screen bg-secondary" data-testid="register-page">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/50 font-semibold">
          <Link to="/" className="hover:text-brand">Accueil</Link><ChevronRight className="w-4 h-4" />
          <Link to={detailLink} className="hover:text-brand truncate max-w-[40vw]">{item.title}</Link><ChevronRight className="w-4 h-4" />
          <span className="text-ink">Inscription</span>
        </nav>

        {/* Summary */}
        <div className="mt-5 flex items-center gap-4 rounded-3xl bg-white border border-ink/5 card-shadow p-4">
          <img src={item.image} alt={item.title} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
          <div>
            <div className="text-sm font-bold text-brand">{item.flag} {item.country}</div>
            <div className="font-display font-bold text-ink leading-tight">{item.title}</div>
            <div className="text-sm text-ink/60">{isCourse ? "Frais de cours" : "Don de solidarité"} : <strong>{item.amount.toFixed(0)} EUR</strong></div>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={submit} className="mt-6 rounded-[1.75rem] bg-white border border-ink/5 card-shadow p-7 md:p-9" data-testid="registration-form">
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink">Formulaire d'inscription</h1>
            <p className="mt-2 text-ink/60">Remplissez vos informations pour candidater à ce programme.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Prénom"><input value={form.first_name} onChange={set("first_name")} data-testid="reg-first-name" className={inputCls} /></Field>
              <Field label="Nom"><input value={form.last_name} onChange={set("last_name")} data-testid="reg-last-name" className={inputCls} /></Field>
              <Field label="E-mail"><input type="email" value={form.email} onChange={set("email")} data-testid="reg-email" className={inputCls} /></Field>
              <Field label="Téléphone (avec indicatif)"><input value={form.phone} onChange={set("phone")} placeholder="+33 6 12 34 56 78" data-testid="reg-phone" className={inputCls} /></Field>
              <Field label="Pays de résidence"><input value={form.country_residence} onChange={set("country_residence")} data-testid="reg-country" className={inputCls} /></Field>
              <Field label="Date de naissance"><input type="date" value={form.birthdate} onChange={set("birthdate")} data-testid="reg-birthdate" className={inputCls} /></Field>
            </div>

            <div className="mt-4">
              <Field label="Session / dates souhaitées">
                <select value={form.session} onChange={set("session")} data-testid="reg-session" className={inputCls}>
                  {SESSIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Motivation">
                <textarea rows={4} value={form.motivation} onChange={set("motivation")} placeholder="Pourquoi souhaitez-vous participer ?" data-testid="reg-motivation" className={`${inputCls} resize-none`} />
              </Field>
            </div>

            <label className="mt-5 flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.confirm_donation} onChange={set("confirm_donation")} data-testid="reg-confirm" className="mt-1 w-5 h-5 accent-[#C8102E]" />
              <span className="text-sm text-ink/70">Je confirme pouvoir verser {feeLabel} de <strong>{item.amount.toFixed(0)} EUR</strong>.</span>
            </label>

            <button type="submit" disabled={submitting} data-testid="reg-submit"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-extrabold px-6 py-4 transition-colors">
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              Envoyer ma candidature
            </button>

            <div className="mt-6 pt-6 border-t border-ink/10">
              <p className="text-sm text-ink/50 mb-3">Une question avant de vous inscrire ?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href={mailtoRecall(item.title)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white border-2 border-ink/10 hover:border-brand text-ink font-semibold px-5 py-3 transition-colors" data-testid="reg-email-link"><Mail className="w-4 h-4" /> Rappel par e-mail</a>
                <a href={whatsappInterest(item.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-5 py-3 transition-colors" data-testid="reg-whatsapp-link"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-6 rounded-[1.75rem] bg-white border border-ink/5 card-shadow p-7 md:p-9" data-testid="payment-step">
            <div className="flex items-center gap-2 text-[#25D366] font-bold"><CheckCircle2 className="w-5 h-5" /> Candidature enregistrée</div>
            <h1 className="mt-3 font-display font-extrabold text-2xl md:text-3xl text-ink">Finalisez votre inscription</h1>
            <p className="mt-2 text-ink/60">Versez {feeLabel} de <strong>{item.amount.toFixed(0)} EUR</strong> pour confirmer votre participation.</p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-ink/70"><ShieldCheck className="w-5 h-5 text-brand" /> Paiement 100% sécurisé, données chiffrées (SSL).</li>
              <li className="flex items-center gap-3 text-ink/70"><Mail className="w-5 h-5 text-brand" /> Reçu envoyé automatiquement par e-mail.</li>
            </ul>

            <div className="mt-7 space-y-4">
              <button onClick={payStripe} disabled={paying} data-testid="pay-stripe-btn"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-extrabold px-6 py-4 transition-colors">
                {paying ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                {paying ? "Redirection sécurisée…" : `Payer par carte (Stripe) · ${item.amount.toFixed(0)} EUR`}
              </button>

              {config?.paypal_enabled && config?.paypal_client_id ? (
                <div data-testid="paypal-wrapper">
                  <PayPalScriptProvider options={{ clientId: config.paypal_client_id, currency: (config.currency || "eur").toUpperCase(), intent: "capture" }}>
                    <PayPalButtons
                      style={{ layout: "horizontal", color: "gold", shape: "pill", height: 48, tagline: false }}
                      createOrder={async () => {
                        const { data } = await axios.post(`${API}/paypal/create-order`, { kind: apiKind, slug, registration_id: regId, name: fullName, email: form.email });
                        return data.order_id;
                      }}
                      onApprove={async (data) => {
                        await axios.post(`${API}/paypal/capture-order`, { order_id: data.orderID });
                        window.location.href = "/payment/success?paypal=1";
                      }}
                      onError={() => toast.error("Erreur PayPal.")}
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button disabled data-testid="paypal-disabled-btn" className="w-full rounded-full border-2 border-dashed border-ink/15 text-ink/40 px-6 py-4 font-bold cursor-not-allowed">
                  PayPal — bientôt disponible
                </button>
              )}
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink/40"><Lock className="w-4 h-4" /> Transaction sécurisée</p>
          </div>
        )}
      </div>
    </main>
  );
}

const inputCls = "w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
