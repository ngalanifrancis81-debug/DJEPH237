import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, Home as HomeIcon } from "lucide-react";

export default function PaymentCancel() {
  return (
    <main className="min-h-screen grid place-items-center bg-secondary px-6 pt-24 pb-16" data-testid="payment-cancel-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center rounded-[1.75rem] border border-ink/5 bg-white p-10 md:p-14 card-shadow">
        <XCircle className="w-16 h-16 text-ink/30 mx-auto" />
        <h1 className="mt-6 font-display font-extrabold text-3xl text-ink" data-testid="cancel-title">Paiement annulé</h1>
        <p className="mt-4 text-ink/60 leading-relaxed">Aucun montant n'a été débité. Vous pouvez réessayer à tout moment — chaque engagement compte.</p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-hover text-white px-7 py-3.5 font-bold transition-colors" data-testid="cancel-home-btn">
          <HomeIcon className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </motion.div>
    </main>
  );
}
