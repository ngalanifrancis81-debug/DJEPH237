import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, Home as HomeIcon, RotateCcw } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export default function PaymentCancel() {
  const { t } = useLang();
  const p = t.payment;

  return (
    <main className="min-h-screen grid place-items-center bg-secondary px-6 pt-24 pb-16" data-testid="payment-cancel-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center rounded-[1.75rem] border border-brand/10 bg-white p-10 md:p-14 shadow-xl shadow-brand/5"
      >
        <XCircle className="w-16 h-16 text-slate-400 mx-auto" />
        <h1 className="mt-6 font-display text-3xl font-semibold text-ink" data-testid="cancel-title">{p.cancelTitle}</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">{p.cancelText}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/don" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-7 py-3.5 font-medium transition-colors" data-testid="cancel-retry-btn">
            <RotateCcw className="w-4 h-4" /> {p.retry}
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink border border-gray-200 hover:border-brand px-7 py-3.5 font-medium transition-colors" data-testid="cancel-home-btn">
            <HomeIcon className="w-4 h-4" /> {p.backHome}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
