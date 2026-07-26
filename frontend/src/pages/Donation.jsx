import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { Heart, ShieldCheck, Lock, Loader2, CreditCard } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const PRESETS = [10, 25, 50, 100];

export default function Donation() {
  const { t, lang } = useLang();
  const d = t.donation;
  const navigate = useNavigate();

  const [config, setConfig] = useState(null);
  const [preset, setPreset] = useState(25);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/config`).then((r) => setConfig(r.data)).catch(() => setConfig({ paypal_enabled: false }));
  }, []);

  const amount = useMemo(() => {
    const val = custom !== "" ? parseFloat(custom) : preset;
    return Number.isFinite(val) ? val : 0;
  }, [custom, preset]);

  const infoValid = name.trim().length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const validate = () => {
    if (!amount || amount < 1) {
      toast.error(d.errAmount);
      return false;
    }
    if (!infoValid) {
      toast.error(d.errInfo);
      return false;
    }
    return true;
  };

  const payWithStripe = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/payments/donate`, {
        amount,
        name: name.trim(),
        email: email.trim(),
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch (e) {
      setLoading(false);
      toast.error(d.error || "Error");
    }
  };

  return (
    <main className="pt-28 pb-24 min-h-screen bg-secondary" data-testid="donation-page">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <span className="text-sm uppercase tracking-widest text-brand font-medium">{d.kicker}</span>
              <h1 className="mt-4 font-display font-semibold tracking-tight text-ink text-4xl md:text-5xl leading-[1.1]">
                {d.title}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{d.subtitle}</p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span>{d.transparency}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <Lock className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span>{d.secure}</span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-[1.75rem] border border-brand/10 bg-white p-7 md:p-10 shadow-xl shadow-brand/5">
                {/* Amounts */}
                <h2 className="font-display text-xl font-medium text-ink">{d.chooseAmount}</h2>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESETS.map((p) => {
                    const active = custom === "" && preset === p;
                    return (
                      <button
                        key={p}
                        onClick={() => { setPreset(p); setCustom(""); }}
                        data-testid={`amount-${p}`}
                        className={`rounded-xl px-4 py-4 font-display text-lg font-medium transition-colors border ${
                          active
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-brand border-brand/20 hover:border-brand hover:bg-brand-light/40"
                        }`}
                      >
                        {p}{d.currencySuffix}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <label className="text-sm text-slate-500">{d.custom}</label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      min="1"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder={d.customPlaceholder}
                      data-testid="amount-custom"
                      className="w-full rounded-xl border border-gray-200 px-4 py-4 pr-10 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{d.currencySuffix}</span>
                  </div>
                </div>

                {/* Info */}
                <h2 className="mt-8 font-display text-xl font-medium text-ink">{d.yourInfo}</h2>
                <div className="mt-4 grid gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={d.name}
                    data-testid="donor-name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={d.email}
                    data-testid="donor-email"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-ink focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition"
                  />
                </div>

                {/* Pay buttons */}
                <div className="mt-8 space-y-4">
                  <button
                    onClick={payWithStripe}
                    disabled={loading}
                    data-testid="pay-stripe-btn"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-8 py-4 font-medium transition-colors"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                    {loading ? d.processing : `${d.payStripe} · ${amount || 0}${d.currencySuffix}`}
                  </button>

                  {config?.paypal_enabled && config?.paypal_client_id ? (
                    <div className={infoValid && amount >= 1 ? "" : "opacity-50 pointer-events-none"} data-testid="paypal-wrapper">
                      <PayPalScriptProvider
                        options={{ clientId: config.paypal_client_id, currency: (config.currency || "eur").toUpperCase(), intent: "capture" }}
                      >
                        <PayPalButtons
                          style={{ layout: "horizontal", color: "blue", shape: "pill", height: 48, tagline: false }}
                          forceReRender={[amount, name, email]}
                          createOrder={async () => {
                            const { data } = await axios.post(`${API}/paypal/create-order`, { amount, name: name.trim(), email: email.trim() });
                            return data.order_id;
                          }}
                          onApprove={async (data) => {
                            await axios.post(`${API}/paypal/capture-order`, { order_id: data.orderID });
                            navigate("/payment/success?paypal=1");
                          }}
                          onError={() => toast.error(d.error || "PayPal error")}
                        />
                      </PayPalScriptProvider>
                    </div>
                  ) : (
                    <button
                      disabled
                      data-testid="paypal-disabled-btn"
                      className="w-full rounded-full border border-dashed border-gray-300 text-slate-400 px-8 py-4 font-medium cursor-not-allowed"
                    >
                      {d.payPaypal} — {d.paypalDisabled}
                    </button>
                  )}
                </div>

                <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Lock className="w-4 h-4" /> {d.secure}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
