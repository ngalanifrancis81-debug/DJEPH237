import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle, Home as HomeIcon } from "lucide-react";
import axios from "axios";
import { useLang } from "@/i18n/LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const MAX_TRIES = 8;

export default function PaymentSuccess() {
  const { t } = useLang();
  const p = t.payment;
  const [params] = useSearchParams();
  const isPaypal = params.get("paypal") === "1";
  const sessionId = params.get("session_id");

  const [state, setState] = useState(isPaypal ? "paid" : "checking"); // checking | paid | failed

  useEffect(() => {
    if (isPaypal || !sessionId) {
      if (!isPaypal && !sessionId) setState("failed");
      return;
    }
    let tries = 0;
    let timer;
    const poll = async () => {
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setState("paid");
          return;
        }
        if (["expired", "failed"].includes(data.payment_status)) {
          setState("failed");
          return;
        }
      } catch (e) {
        /* keep trying */
      }
      tries += 1;
      if (tries >= MAX_TRIES) {
        setState("failed");
        return;
      }
      timer = setTimeout(poll, 2000);
    };
    poll();
    return () => clearTimeout(timer);
  }, [sessionId, isPaypal]);

  return (
    <main className="min-h-screen grid place-items-center bg-secondary px-6 pt-24 pb-16" data-testid="payment-success-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center rounded-[1.75rem] border border-brand/10 bg-white p-10 md:p-14 shadow-xl shadow-brand/5"
      >
        {state === "checking" && (
          <>
            <Loader2 className="w-14 h-14 text-brand animate-spin mx-auto" />
            <p className="mt-6 text-lg text-slate-600" data-testid="payment-verifying">{p.verifying}</p>
          </>
        )}
        {state === "paid" && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
              <CheckCircle2 className="w-16 h-16 text-wa mx-auto" />
            </motion.div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-ink" data-testid="payment-success-title">{p.successTitle}</h1>
            <p className="mt-4 text-slate-600 leading-relaxed">{p.successText}</p>
          </>
        )}
        {state === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-destructive mx-auto" />
            <h1 className="mt-6 font-display text-3xl font-semibold text-ink" data-testid="payment-failed-title">{p.failedTitle}</h1>
            <p className="mt-4 text-slate-600 leading-relaxed">{p.failedText}</p>
          </>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-7 py-3.5 font-medium transition-colors" data-testid="success-home-btn">
            <HomeIcon className="w-4 h-4" /> {p.backHome}
          </Link>
          {state === "failed" && (
            <Link to="/don" className="inline-flex items-center justify-center rounded-full bg-white text-ink border border-gray-200 hover:border-brand px-7 py-3.5 font-medium transition-colors" data-testid="success-retry-btn">
              {p.retry}
            </Link>
          )}
        </div>
      </motion.div>
    </main>
  );
}
